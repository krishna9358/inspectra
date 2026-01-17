import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Consume body for GitHub webhook validation, even though we don't use it yet
    void (await req.json());
    const event = req.headers.get("x-github-event");
    if (event === "ping") {
      return NextResponse.json({ message: "pong" }, { status: 200 });
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
