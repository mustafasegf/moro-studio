import { createTRPCRouter } from "~/server/api/trpc";
import { contohRouter } from "~/server/api/routers/contoh";
import { authRouter } from "~/server/api/routers/auth";
import { feedbackRouter } from "./routers/feedback";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contoh: contohRouter,
  auth: authRouter,
  feedback: feedbackRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
