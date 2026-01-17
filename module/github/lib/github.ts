import { Octokit } from "octokit";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";

// =====================
// Getting GITHUB TOKEN
// =====================

export const getGithubToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });
  if (!account) {
    throw new Error("No github access token found");
  }
  return account.accessToken;
};

// =====================
// Fetch User Contribution
// =====================

export const fetchUserContribution = async (
  token: string,
  username: string,
) => {
  const octokit = new Octokit({
    auth: token,
  });
  const query = `
    query {
        user(login: "${username}") {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                            color
                        }
                    } 
                }
            }
        }
    } 
    `;

  interface ContributionData {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
              color: string;
            }[];
          }[];
        };
      };
    };
  }
  try {
    const response: ContributionData = await octokit.graphql(query, {
      username,
    });
    return response.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.log("Error wihle fetching Contribution Data ==> ", error);
  }
};

// =================
// get all the repositories
// =================

export const getRepositories = async (
  page: number = 1,
  perPage: number = 10,
) => {
  const token = await getGithubToken();
  const octokit = new Octokit({
    auth: token,
  });

  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "updated",
    direction: "desc",
    visibility: "all",
    per_page: perPage,
    page: page,
  });

  return data;
};

// =================
// Create Webhook in github repo
// =================

export const createWebhook = async (owner: string, repo: string) => {
  const token = await getGithubToken();
  const octokit = new Octokit({
    auth: token,
  });
  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/webhook/github`;
  const { data: hooks } = await octokit.rest.repos.listWebhooks({
    owner,
    repo,
  });

  // checking if existing webhook
  const existingHook = await hooks.find(
    (hook) => hook.config.url === webhookUrl,
  );
  if (existingHook) {
    return existingHook;
  }
  // create webhook
  const { data } = await octokit.rest.repos.createWebhook({
    owner,
    repo,
    name: "web",
    config: { url: webhookUrl, content_type: "json" },
    events: ["pull_request"],
  });

  return data;
};

// ================
// DELETE WEBHOOK
// ================

export const deleteWebhook = async (owner: string, repo: string) => {
  const token = await getGithubToken();
  const octokit = new Octokit({
    auth: token,
  });
  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/webhook/github`;
  try {
    const { data: hooks } = await octokit.rest.repos.listWebhooks({
      owner,
      repo,
    });
    const existingHook = await hooks.find(
      (hook) => hook.config.url === webhookUrl,
    );
    if (existingHook) {
      await octokit.rest.repos.deleteWebhook({
        owner,
        repo,
        hook_id: existingHook.id,
      });
      return true;
    }
    return true;
  } catch (error) {
    console.log("Error while deleting webhook ==> ", error);
    return false;
  }
};

/**
 * Recursively fetches all file contents from a GitHub repository.
 *
 * This function traverses the repository's file structure starting from a given path,
 * and returns an array of all text-based files with their contents decoded from base64.
 *
 * @param token - GitHub personal access token for authentication
 * @param owner - Repository owner (username or organization)
 * @param repo - Repository name
 * @param path - Starting path within the repository (defaults to root "")
 * @returns Promise<Array<{path: string, content: string}>> - Array of file objects
 *
 * @example
 * // Fetch all files from repository root
 * const files = await getRepoFileContents(token, "octocat", "hello-world");
 *
 * @example
 * // Fetch files from a specific directory
 * const srcFiles = await getRepoFileContents(token, "octocat", "hello-world", "src");
 *
 * @remarks
 * - Binary files (images, PDFs, archives) are automatically filtered out
 * - The function recursively traverses all subdirectories
 * - File contents are decoded from base64 to UTF-8 strings
 *
 * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
 */
export const getRepoFileContents = async (
  token: string,
  owner: string,
  repo: string,
  path: string = "",
): Promise<{ path: string; content: string }[]> => {
  const octokit = new Octokit({
    auth: token,
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // STEP 1: Fetch content at the given path
  // ─────────────────────────────────────────────────────────────────────────────
  // The GitHub API returns different response types based on what's at the path:
  // - If path points to a FILE: returns a single object with file metadata + content
  // - If path points to a DIRECTORY: returns an array of items (files/subdirs)
  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // STEP 2: Handle single file response (when path points directly to a file)
  // ─────────────────────────────────────────────────────────────────────────────
  // If `data` is NOT an array, it means we requested a specific file path.
  // We decode its base64 content and return it as a single-item array.
  if (!Array.isArray(data)) {
    if (data.type === "file" && data.content) {
      return [
        {
          path: data.path,
          // GitHub API returns file content as base64-encoded string
          content: Buffer.from(data.content, "base64").toString("utf-8"),
        },
      ];
    }
    // If it's not a file (e.g., submodule or symlink), return empty array
    return [];
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // STEP 3: Handle directory response (when path points to a directory)
  // ─────────────────────────────────────────────────────────────────────────────
  // If `data` IS an array, we're looking at a directory listing.
  // Each item in the array has: { name, path, type, sha, size, ... }
  // where `type` can be: "file", "dir", "submodule", or "symlink"

  // Accumulator for all files found (including from subdirectories)
  let files: { path: string; content: string }[] = [];

  // Binary file extensions to exclude (these can't be meaningfully indexed as text)
  const BINARY_FILE_PATTERN = /\.(png|jpg|jpeg|gif|svg|ico|pdf|zip|tar|gz)$/i;

  // Iterate through each item in the directory
  for (const item of data) {
    // ─────────────────────────────────────────────────────────────────────────
    // CASE A: Item is a FILE
    // ─────────────────────────────────────────────────────────────────────────
    // Note: Directory listings don't include file content, only metadata.
    // We need to make a separate API call to fetch the actual file content.
    if (item.type === "file") {
      // Skip binary files that can't be processed as text
      if (BINARY_FILE_PATTERN.test(item.path)) {
        continue;
      }

      // Fetch the actual file content (directory listing only has metadata)
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: item.path,
      });

      // Verify the response is a valid file with content
      if (
        !Array.isArray(fileData) &&
        fileData.type === "file" &&
        fileData.content
      ) {
        files.push({
          path: item.path,
          content: Buffer.from(fileData.content, "base64").toString("utf-8"),
        });
      }
    }
    // ─────────────────────────────────────────────────────────────────────────
    // CASE B: Item is a DIRECTORY
    // ─────────────────────────────────────────────────────────────────────────
    // Recursively fetch all files from the subdirectory
    else if (item.type === "dir") {
      const subFiles = await getRepoFileContents(token, owner, repo, item.path);
      files = files.concat(subFiles);
    }
    // Note: We ignore "submodule" and "symlink" types for now
  }

  return files;
};

export async function getPullRequestDiff(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
) {
  const octokit = new Octokit({
    auth: token,
  });
  const { data: pr } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  });

  const { data: diff } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: {
      format: "diff",
    },
  });
  return {
    title: pr.title,
    diff: diff as unknown as string,
    description: pr.body || "",
  };
}

export async function postReviewComment(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
  review: string,
) {
  const octokit = new Octokit({
    auth: token,
  });
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: `## AI CODE REVIEW \n\n ${review} \n\n -- \n *Powered by Inspectra* \n\n `,
  });
}
