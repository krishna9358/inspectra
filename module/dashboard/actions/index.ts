"use server";
import { fetchUserContribution, getGithubToken } from "@/module/github/lib/github";
import {auth} from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import { Octokit } from "octokit";

// =====================
// Get Contrbution Stats
// =====================

export const getDashboardStats = async() => {
      try{
        // Trying to get the session 
        const session = await auth.api.getSession({
            headers : await headers()
        })
        if(!session?.user){
            throw new Error("Unauthorized");
        }
        // Trying to get the github token 
        const token = await getGithubToken();
        if(!token){
            throw new Error("No github access token found");
        }
        // Creating Octokit Instance
        const octokit = new Octokit({
            auth : token 
        })

        // Geting the username
        const {data:users} = await octokit.rest.users.getAuthenticated()
        
        // TODO: Fetch the total connected repo from db
        const totalRepo = 30; 

        // Getting the Contribution data
        const calendar = await fetchUserContribution(token, users.login)
        const totalCommits = calendar?.totalContributions || 0;

        // Count total PRs from database or github
        const {data:prs} = await octokit.rest.search.issuesAndPullRequests({
            q : `author:${users.login}`,
            type : "pr",
            sort : "created",
            order : "desc",
            per_page : 1
        })
        const totalPrs = prs.total_count;

        // TODO: Count AI reviews from database
        const totalReviews = 10; 

        return {
            totalRepo,
            totalCommits,
            totalPrs,
            totalReviews
        }
      }catch(error){
        console.log("Error while fetching dashboard stats ==> ", error);
        return {
            totalRepo : 0,
            totalCommits : 0,
            totalPrs : 0,
            totalReviews : 0
        };    

      }
}



// =====================
// Get Monthly Activity
// =====================
export const getMonthlyActivity = async() => {
    
}
 