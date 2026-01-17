"use server";

import prisma from "@/lib/db";
import { getPullRequestDiff } from "@/module/github/lib/github";

export const reviewPullRequest = async (owner: string, repo: string, prNumber: number) => {
    const repository = await prisma.repository.findFirst({
        where:{
            owner,
            name: repo,
        },
        include:{
            user:{
                include:{
                    accounts:{
                        where:{
                            providerId: "github",
                        }
                    }
                }
            }
        }
    })
    if(!repository){
        throw new Error(`Repository ${owner}/${repo} not found`);
    }

    const githubAccount = repository.user.accounts[0];

    const accessToken = githubAccount.accessToken;

    if(!accessToken){
        throw new Error("Access token not found");
    }

    const {title,diff,description} = await getPullRequestDiff(accessToken, owner, repo, prNumber);
}
