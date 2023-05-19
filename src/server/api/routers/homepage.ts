import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const homepageRouter = createTRPCRouter({
  getHomepage: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.home.findFirst();
  }),

  updateHomepage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string(),
        carousel: z.array(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.home.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
          carousel: input.carousel,
        },
      });
    }),
});
