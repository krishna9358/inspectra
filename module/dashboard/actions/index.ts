"use server";
import {
  fetchUserContribution,
  getGithubToken,
} from "@/module/github/lib/github";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import { Octokit } from "octokit";

// =====================
//  Get Contribution Stats
// =====================

export const getContributionStats = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const token = await getGithubToken();
    if (!token) {
      throw new Error("No github access token found");
    }

    const octokit = new Octokit({
      auth: token,
    });

    const { data: users } = await octokit.rest.users.getAuthenticated();
    const username = users.login;

    const calendar = await fetchUserContribution(token, username);

    if (!calendar) {
      return null;
    }

    const contributions = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => {
        day: day.date;
        count: day.contributionCount;
        level: Math.min(4, Math.floor(day.contributionCount / 3)); //convert to 0-4 scale
      })
    );
  } catch (error) {}
};

// =====================
// Get Contrbution Stats
// =====================
export const getDashboardStats = async () => {
  try {
    // Trying to get the session
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    // Trying to get the github token
    const token = await getGithubToken();
    if (!token) {
      throw new Error("No github access token found");
    }
    // Creating Octokit Instance
    const octokit = new Octokit({
      auth: token,
    });

    // Geting the username
    const { data: users } = await octokit.rest.users.getAuthenticated();

    // TODO: Fetch the total connected repo from db
    const totalRepo = 30;

    // Getting the Contribution data
    const calendar = await fetchUserContribution(token, users.login);
    const totalCommits = calendar?.totalContributions || 0;

    // Count total PRs from database or github
    const { data: prs } = await octokit.rest.search.issuesAndPullRequests({
      q: `author:${users.login}`,
      type: "pr",
      sort: "created",
      order: "desc",
      per_page: 1,
    });
    const totalPrs = prs.total_count;

    // TODO: Count AI reviews from database
    const totalReviews = 10;

    return {
      totalRepo,
      totalCommits,
      totalPrs,
      totalReviews,
    };
  } catch (error) {
    console.log("Error while fetching dashboard stats ==> ", error);
    return {
      totalRepo: 0,
      totalCommits: 0,
      totalPrs: 0,
      totalReviews: 0,
    };
  }
};

// =====================
// Get Monthly Activity
// =====================
/*
1. Authentication Check
2. Get Github Username
3. Fetches commits : 
    - gets contribution calendar
    - counts how many commits in each months
4. fetches code reviews
    - grouping by 6 months.
5. Fetch the PRs
    - all PRs in last 6 months
    - counts how many PRs in each months
6. Organizes everything
    - Data structure for months
    - for each months : number of commits, number of PRs, number of reviews

Output Format: {name: "Jul", commits: 45, prs: 01, reviews: 02 }

 */
export const getMonthlyActivity = async () => {
  try {
    // 1. Authenticate the user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    // 2. Retrieve the GitHub access token
    const token = await getGithubToken();
    if (!token) {
      throw new Error("No github access token found");
    }

    // 3. Initialize the Octokit client with the token
    const octokit = new Octokit({
      auth: token,
    });

    // 4. Get authenticated user details
    const { data: users } = await octokit.rest.users.getAuthenticated();

    // 5. Fetch user contribution calendar (commits, etc.)
    const calendar = await fetchUserContribution(token, users.login);

    if (!calendar) {
      return [];
    }

    // 6. Initialize the data structure for monthly activity
    const monthlyData: {
      [key: string]: { commits: number; prs: number; reviews: number };
    } = {};

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // 7. Initialize keys for the last 6 months to ensure continuity
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = monthNames[date.getMonth()];
      monthlyData[monthKey] = { commits: 0, prs: 0, reviews: 0 };
    }

    // 8. Process contribution calendar to count commits per month
    calendar.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        const date = new Date(day.date);
        const monthKey = monthNames[date.getMonth()];
        // Only aggregate if the month is within our initialized range (last 6 months)
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].commits += day.contributionCount;
        }
      });
    });

    // 9. Prepare date range for fetching other data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 10. TODO: Fetch real reviews data. Currently generating sample data.
    const generateSampleReviews = () => {
      const sampleReviews = [];
      const now = new Date();

      // Generate random reviews over the past 6 months
      for (let i = 0; i < 45; i++) {
        const randomDaysAgo = Math.floor(Math.random() * 180); // Random day in last 6 months
        const reviewDate = new Date(now);
        reviewDate.setDate(reviewDate.getDate() - randomDaysAgo);

        sampleReviews.push({
          createdAt: reviewDate,
        });
      }

      return sampleReviews;
    };

    const reviews = generateSampleReviews();

    // 11. Aggregate reviews count per month
    reviews.forEach((review) => {
      const monthKey = monthNames[review.createdAt.getMonth()];
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].reviews += 1;
      }
    });

    // 12. Fetch Pull Requests created by the user in the last 6 months
    const { data: prs } = await octokit.rest.search.issuesAndPullRequests({
      q: `author:${users.login} type:pr created:>${
        sixMonthsAgo.toISOString().split("T")[0]
      }`,
      per_page: 100,
    });

    // 13. Aggregate PRs count per month
    prs.items.forEach((pr: any) => {
      const date = new Date(pr.created_at);
      const monthKey = monthNames[date.getMonth()];
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].prs += 1;
      }
    });

    // 14. Format the final result as an array of objects
    return Object.keys(monthlyData).map((name) => ({
      name,
      ...monthlyData[name],
    }));
  } catch (error) {
    console.log("Error while fetching the getMonthlyActivity =>", error);
    return [];
  }
};
