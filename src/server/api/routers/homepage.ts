import { date, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const homepageRouter = createTRPCRouter({
  createSection: publicProcedure
    .input(
      z.object({
        image: z.array(z.string()),
        title: z.array(z.string()),
        text: z.array(z.string()),
        link: z.array(z.string()),
        type: z.string(),
        order: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.section.create({
        data: {
          image: input.image,
          title: input.title,
          text: input.text,
          link: input.link,
          type: input.type,
          order: input.order,
        },
      });
    }),

  updateSection: publicProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.array(z.string()),
        title: z.array(z.string()),
        text: z.array(z.string()),
        link: z.array(z.string()),
        order: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.section.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
          title: input.title,
          text: input.text,
          link: input.link,
          order: input.order,
        },
      });
    }),

  getAllSections: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.section.findMany();
  }),

  getSortedSections: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.section.findMany({
      orderBy: {
        order: "asc",
      },
    });
  }),

  getSectionById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.section.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
