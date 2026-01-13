import { Octokit } from "octokit";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import page from "@/app/(dashboard)/dashboard/page";

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

export const createWebhook = async (owner:string, repo:string) => {
      const token = await getGithubToken();
      const octokit = new Octokit({
        auth: token,
      });
      const webhookUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/webhook/github`
      const {data:hooks} = await octokit.rest.repos.listWebhooks({owner, repo});
      
      // checking if existing webhook 
      const existingHook = await hooks.find(hook=>hook.config.url === webhookUrl);
      if(existingHook){
        return existingHook;
      }
      // create webhook
      const {data} = await octokit.rest.repos.createWebhook({owner, repo, name: "web", config: {url: webhookUrl, content_type: "json"}, events: ["pull_request"]});
       
      return data;


}; 
