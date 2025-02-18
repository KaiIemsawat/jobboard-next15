import { inngest } from "@/app/utils/innjest/client";
import { serve } from "inngest/next";
import { handleJobExpiration, helloWorld } from "./function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, handleJobExpiration],
});
