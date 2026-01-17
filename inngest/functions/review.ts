import { getPullRequestDiff } from "@/module/github/lib/github";
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
    const { owner, repo, prNumber, userId } = event.data;
    const { diff, title, description, token } = await step.run(
      "fetch-pr-data",
      async () => {
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

    const context = await step.run("retreive-context", async () => {
      const query = `${title}\n${description}`;
      return await retrieveContext(query, `${owner}/${repo}`);
    });

    const review = await step.run("generate-ai-review", async () => {
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

      return text;
    });

    await step.run("post-comment", async ()=>{
        await postReviewComment(token, owner, repo, prNumber, review);
    })
  },
);
