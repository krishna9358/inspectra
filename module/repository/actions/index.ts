"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createWebhook, getRepositories } from "@/module/github/lib/github";
import { headers } from "next/headers";

// =================
// Fetch Repositories
// =================

export const fetchRepositories = async (
  page: number = 1,
  perPage: number = 10,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const githubRepo = await getRepositories(page, perPage);
  const dbRepos = await prisma.repository.findMany({
    where: {
      userId: session.user.id,
    },
  });
  const connectedRepoIds = new Set(dbRepos.map((repo) => repo.githubId));

  return githubRepo.map((repo) => ({
    ...repo,
    isConnected: connectedRepoIds.has(BigInt(repo.id)),
  }));
};

// =================
// Connect Repository
// =================

export const connectRepository = async (
  owner: string,
  repo: string,
  githubid: number,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  // TODO: Check if user can connect more repo, rate limiting
  const webhook = await createWebhook(owner, repo);

  if (webhook) {
    await prisma.repository.create({
      data: {
        githubId: BigInt(githubid),
        name: repo,
        owner: owner,
        fullName: `${owner}/${repo}`,
        url: `https://github.com/${owner}/${repo}`,
        userId: session.user.id,
      },
    });
  }

  // TODO: INCREAMENT REPOSITORY COUNT FOR USAGE TRACKING

  // TODO: Trigger Repository indexing for rag (fire and forget)

  try {
    await inngest.send({
      name: "repository.connected",
      data: {
        owner,
        repo,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Failed to trigger repository indexing", error);
  }

  return webhook;
};
