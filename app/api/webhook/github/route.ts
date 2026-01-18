import { reviewPullRequest } from "@/module/ai/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the webhook payload body
    const body = await req.json();
    const event = req.headers.get("x-github-event");
    if (event === "ping") {
      return NextResponse.json({ message: "pong" }, { status: 200 });
    }

    // for PR event
    if (event === "pull_request") {
      const action = body.action;
      const repo = body.repository.full_name;
      const prNumber = body.number;

      const [owner, repoName] = repo.split("/");

      if (action === "opened" || action === "synchronize") {
        reviewPullRequest(owner, repoName, prNumber)
          .then(() => console.log(`Review completed for ${repo} #${prNumber}`))
          .catch((error: string) =>
            console.log(`Review failed for ${repo} #${prNumber}`, error),
          );
      }
    }

    return NextResponse.json({ message: "Event Processed", status: 200 });
  } catch (error) {
    console.log("Error processing webhook", error);
    return NextResponse.json({
      message: "Error processing webhook",
      status: 500,
    });
  }
}