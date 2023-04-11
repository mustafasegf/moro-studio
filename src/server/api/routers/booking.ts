import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { addBookingSchema } from "~/utils/schemas";

export const bookingRouter = createTRPCRouter({
  addBooking: publicProcedure
    .input(addBookingSchema)
    .mutation(({ input, ctx }) => {
      console.log(input)
      // check if booking exist on that date
      // const booking = await ctx.prisma.booking.findFirst({
      //   where: {
      //     tanggal: input.tanggal,
      
      // if exist, throw error
      
      // if not, create booking with pending status
    
      // create user if not exist and send email to user
    }),
  
});
