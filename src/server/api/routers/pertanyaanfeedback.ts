import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const pertanyaanFeedbackRouter = createTRPCRouter({
  addPertanyaanFeedback: publicProcedure
    .input(
      z.object({
        pertanyaan: z.string(),
        // feedback: z.array(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.pertanyaanFeedback.create({
        data: {
          pertanyaan: input.pertanyaan,
          feedback: {
          // connect: input.feedback.map((feedbackId: string) => ({ Id: feedbackId })),
          },
        },
      });
    }),
  
  getAllPertanyaanFeedback: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pertanyaanFeedback.findMany();
  }),

  // getFeedbackById: publicProcedure
  //   .input(
  //     z.object({
  //       Id: z.string(),
  //     })
  //   )
  //   .query(({ input, ctx }) => {
  //     return ctx.prisma.feedback.findUnique({
  //       where: {
  //         Id : input.Id,
  //       }
  //     });
  //   }),

  deletePertanyaanFeedback: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    return ctx.prisma.pertanyaanFeedback.delete({
      where: {
        id: input.id,
      },
    });
  }),

  // updateFeedback: publicProcedure
  //   .input(
  //     z.object({
  //       Id: z.string(),
  //       namaPenulis: z.string(),
  //       isiFeedback: z.string(),
  //     })
  //   )
  //   .mutation(({ input, ctx }) => {
  //     return ctx.prisma.feedback.update({
  //       where: {
  //         Id: input.Id,
  //       },
  //       data: {
  //         namaPenulis: input.namaPenulis,
  //         isiFeedback: input.isiFeedback,
  //       },
  //     });
  //   }),
});
