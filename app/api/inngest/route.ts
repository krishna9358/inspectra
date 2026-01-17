import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld, indexRepo } from "@/inngest/functions";
import { generateReview } from "@/inngest/functions/review";

// Create an API that serves Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, indexRepo, generateReview],
});
