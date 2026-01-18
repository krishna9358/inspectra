"use server";

import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { getPullRequestDiff } from "@/module/github/lib/github";

export const reviewPullRequest = async (
  owner: string,
  repo: string,
  prNumber: number,
) => {
  try {
    const repository = await prisma.repository.findFirst({
      where: {
        owner,
        name: repo,
      },
      include: {
        user: {
          include: {
            accounts: {
              where: {
                providerId: "github",
              },
            },
          },
        },
      },
    });
    if (!repository) {
      throw new Error(`Repository ${owner}/${repo} not found`);
    }

    const githubAccount = repository.user.accounts[0];

    const accessToken = githubAccount.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const { title, diff, description } = await getPullRequestDiff(
      accessToken,
      owner,
      repo,
      prNumber,
    );

    console.log(`[reviewPullRequest] Sending Inngest event for ${owner}/${repo} PR #${prNumber}`);
    
    const eventResult = await inngest.send({
      name: "pr.review.requested",
      data: {
        owner,
        repo,
        prNumber,
        title,
        description,
        diff,
        userId: repository.user.id,
      },
    });

    console.log(`[reviewPullRequest] Inngest event sent successfully:`, eventResult);

    return { success: true, message: "Review Queued" };
  } catch (error) {
    try {
      const repository = await prisma.repository.findFirst({
        where: {
          owner,
          name: repo,
        },
      });
      if (repository) {
        await prisma.review.create({
          data: {
            repositoryId: repository.id,
            prNumber,
            prTitle: "Failed to fetch PR details",
            prUrl: `https://github.com/${owner}/${repo}/pull/${prNumber}`,
            review: `Error : ${error instanceof Error ? error.message : String(error)}`,
            status: "failed",
          },
        });
      }
      return { success: false, message: "Review Failed" };
    } catch (dberror) {
      return {
        success: false,
        message: "failed to save review error to database",
      };
    }
  }
};
