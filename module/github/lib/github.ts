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
  username: string
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
