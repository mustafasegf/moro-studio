import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addBookingSchema } from "~/utils/schemas";
import { sendEmail } from "~/utils/sendemail";

export const bookingRouter = createTRPCRouter({
  addBooking: publicProcedure
    .input(addBookingSchema)
    .mutation(async ({ input, ctx }) => {
      // check if booking exist on that date
      // TODO: handle if duration more than 40
      let booking = await ctx.prisma.booking.findFirst({
        where: {
          jadwal: input.tanggal,
          deleted: false,
        },
      });

      // if exist, throw error
      if (booking) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Booking sudah ada",
        });
      }

      // check if user exist
      let user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
          deleted: false,
        },
      });

      // if not, create user
      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            nama: input.nama,
            instagram: input.instagram || undefined,
            hp: input.hp || undefined,
          },
        });
      }
      console.log({ user });

      // if not, create booking with booked status
      booking = await ctx.prisma.booking.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          background: {
            connect: {
              warna: input.warna,
            },
          },
          katalog: {
            connect: {
              id: input.katalog.id,
            },
          },
          kupon: input.kupon
            ? {
              connect: {
                kode: input.kupon,
              },
            }
            : undefined,
          peliharaan: input.peliharaan,
          harga: input.katalog.harga,
          jadwal: input.tanggal,
          durasi: input.katalog.durasi,
          jumlahOrang: input.jumlahOrang,
          // detail: "",
          status: "booked",
        },
      });

      //send email to user
      return sendEmail(user.email, ctx.transport);
    }),

  getAllBooking: publicProcedure
    .input(
      z.object({
        from: z.date(),
        to: z.date(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.booking.findMany({
        where: {
          deleted: false,
          AND: [
            {
              jadwal: {
                gte: input.from,
              },
            },
            {
              jadwal: {
                lte: input.to,
              },
            },
          ],
        },
        include: {
          katalog: true,
          Pembayaran: true,
          FotoUser: true,
        },
      });
    }),

  getAllBackground: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.backgroundFoto.findMany({
      where: {
        deleted: false,
      },
    });
  }),
});
