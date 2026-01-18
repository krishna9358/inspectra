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
        console.log(`[Webhook] PR ${action} event received for ${repo} #${prNumber}`);
        try {
          const result = await reviewPullRequest(owner, repoName, prNumber);
          console.log(`[Webhook] Review queued successfully for ${repo} #${prNumber}:`, result);
        } catch (error) {
          console.error(`[Webhook] Failed to queue review for ${repo} #${prNumber}:`, error);
          // Don't throw - we still want to return 200 to GitHub
        }
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
