import { createTRPCRouter } from "~/server/api/trpc";
import { homepageRouter } from "./routers/homepage";
import { catalogueRouter } from "~/server/api/routers/catalogue";
import { contohRouter } from "~/server/api/routers/contoh";
import { authRouter } from "~/server/api/routers/auth";
import { feedbackRouter } from "./routers/feedback";
import { userRouter } from "./routers/user";
import { kuponRouter } from "./routers/kupon";
import { bookingRouter } from "./routers/booking";
import { imageRouter } from "./routers/images";
import { pembayaranRouter } from "./routers/pembayaran";
import { blogRouter } from "./routers/blog";
import { pertanyaanFeedbackRouter } from "./routers/pertanyaanfeedback";
import { aksesFotoRouter } from "./routers/aksesfoto";
import { chatRouter } from "./routers/chat";
import { detailPemesananRouter } from "./routers/detailpemesanan";

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
  pertanyaanFeedback: pertanyaanFeedbackRouter,
  feedback: feedbackRouter,
  kupon: kuponRouter,
  booking: bookingRouter,
  image: imageRouter,
  pembayaran: pembayaranRouter,
  blog: blogRouter,
  aksesFoto: aksesFotoRouter,
  chat: chatRouter,
  detailPemesanan: detailPemesananRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
