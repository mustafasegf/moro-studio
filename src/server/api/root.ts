import { createTRPCRouter } from "~/server/api/trpc";
import { homepageRouter } from "./routers/homepage";
import { catalogueRouter } from "~/server/api/routers/catalogue";
import { contohRouter } from "~/server/api/routers/contoh";
import { authRouter } from "~/server/api/routers/auth";
import { feedbackRouter } from "./routers/feedback";
import { userRouter } from "./routers/user";
import { bookingRouter } from "./routers/booking";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  homepage: homepageRouter,
  catalogue: catalogueRouter,
  contoh: contohRouter,
  auth: authRouter,
  user: userRouter,
  feedback: feedbackRouter,
  booking: bookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
