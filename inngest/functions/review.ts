import {
  getPullRequestDiff,
  postReviewComment,
} from "@/module/github/lib/github";
import { inngest } from "../client";
import { retrieveContext } from "@/module/ai/lib/rag";
import prisma from "@/lib/db";
import { generateReviewPrompt } from "@/module/ai/prompt";
import { generateText } from "ai";
import { openrouter } from "@/module/ai/lib/openrouter";

export const generateReview = inngest.createFunction(
  { id: "generate-review", concurrency: 5 },
  { event: "pr.review.requested" },
  async ({ event, step }) => {
    console.log(`[generateReview] Event received:`, { 
      eventName: event.name, 
      data: { owner: event.data.owner, repo: event.data.repo, prNumber: event.data.prNumber } 
    });

    const { owner, repo, prNumber, userId, title: eventTitle, description: eventDescription, diff: eventDiff } = event.data;
    
    // Use data from event if available, otherwise fetch it
    const { diff, title, description, token } = await step.run(
      "fetch-pr-data",
      async () => {
        // If we already have the data from the event, use it
        if (eventTitle && eventDescription && eventDiff) {
          console.log(`[generateReview] Using PR data from event`);
          const account = await prisma.account.findFirst({
            where: {
              userId,
              providerId: "github",
            },
          });
          if (!account?.accessToken) {
            throw new Error("No github access token found");
          }
          return { 
            title: eventTitle, 
            diff: eventDiff, 
            description: eventDescription, 
            token: account.accessToken 
          };
        }

        // Otherwise, fetch it (fallback)
        console.log(`[generateReview] Fetching PR data from GitHub`);
        const account = await prisma.account.findFirst({
          where: {
            userId,
            providerId: "github",
          },
        });
        if (!account) {
          throw new Error("No github access token found");
        }
        const accessToken = account.accessToken;
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const { title, diff, description } = await getPullRequestDiff(
          accessToken,
          owner,
          repo,
          prNumber,
        );
        return { title, diff, description, token: accessToken };
      },
    );

    const context = await step.run("retrieve-context", async () => {
      console.log(`[generateReview] Retrieving context for ${owner}/${repo}`);
      const query = `${title}\n${description}`;
      const contextResult = await retrieveContext(query, `${owner}/${repo}`);
      console.log(`[generateReview] Context retrieved, length: ${contextResult?.length || 0}`);
      return contextResult;
    });

    const review = await step.run("generate-ai-review", async () => {
      console.log(`[generateReview] Generating AI review...`);
      const prompt = generateReviewPrompt({
        title,
        description,
        context,
        diff,
      });

      const { text } = await generateText({
        model: openrouter("qwen/qwen3-coder:free"),
        prompt,
      });

      console.log(`[generateReview] AI review generated, length: ${text?.length || 0}`);
      return text;
    });

    await step.run("post-comment", async () => {
      console.log(`[generateReview] Posting review comment to GitHub...`);
      await postReviewComment(token, owner, repo, prNumber, review);
      console.log(`[generateReview] Review comment posted successfully`);
    });
    await step.run("save-review", async () => {
      console.log(`[generateReview] Saving review to database...`);
      const repository = await prisma.repository.findFirst({
        where: {
          owner,
          name: repo,
        },
      });
      if (!repository) {
        throw new Error(`Repository ${owner}/${repo} not found`);
      }
      await prisma.review.create({
        data: {
          repositoryId: repository.id,
          prNumber,
          prTitle: title,
          prUrl: `https://github.com/${owner}/${repo}/pull/${prNumber}`,
          review,
          status: "completed",
        },
      });
      console.log(`[generateReview] Review saved to database successfully`);
    });
    
    console.log(`[generateReview] Review process completed successfully`);
    return { success: true };
  },
);
