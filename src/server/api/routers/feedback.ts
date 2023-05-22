import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { addFeedbackSchema } from "~/utils/schemas";

export const feedbackRouter = createTRPCRouter({
  // addFeedback: userProcedure
  //   .input(
  //     z.object({
  //       namaPenulis: z.string(),
  //       isiFeedback: z.string(),
  //     })
  //   )
  //   .mutation(({ input, ctx }) => {
  //     return ctx.prisma.feedback.create({
  //       data: {
  //         user: {
  //           connect: {
  //             id: ctx.session.id,
  //           },
  //         },
  //         namaPenulis: input.namaPenulis,
  //         isiFeedback: input.isiFeedback,
  //       },
  //     });
  //   }),
  addFeedback: userProcedure
  .input(addFeedbackSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.id; // Assuming `id` is the field that uniquely identifies a user

    // Check if the user exists
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found'); // You can handle this error according to your needs
    }

    // Create the feedback record and connect it to the user
    try {
        const data = await ctx.prisma.feedback.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            namaPenulis: input.namaPenulis,
            isiFeedback: input.isiFeedback,
          },
        });
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Tidak bisa akses database" });
      }

    }),
  
  getAllFeedback: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.feedback.findMany();
  }),

  getFeedbackById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.feedback.findUnique({
        where: {
          id : input.id,
        }
      });
    }),

  deleteFeedback: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    return ctx.prisma.feedback.delete({
      where: {
        id: input.id,
      },
    });
  }),

  updateFeedback: publicProcedure
    .input(
      z.object({
        id: z.string(),
        namaPenulis: z.string(),
        isiFeedback: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feedback.update({
        where: {
          id: input.id,
        },
        data: {
          isiFeedback: input.isiFeedback,
        },
      });
    }),
});
