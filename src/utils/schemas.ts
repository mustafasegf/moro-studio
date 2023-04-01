import { z } from "zod";
import { roles } from "~/utils/roles";
import isMobilePhone from "validator/lib/isMobilePhone";
import { KatalogSchema } from '~/utils/zod-prisma'

export const addUserSchema = z.object({
  nama: z.string().min(1, "nama perlu diisi"),
  email: z.string().min(1, "email perlu diisi").email("email tidak valid"),
  hp: z
    .string()
    .optional()
    .refine((val) => !val || isMobilePhone(val, "id-ID"), "nomor hp tidak valid"),
  role: z.enum(roles),
});

export type AddUserSchema = z.infer<typeof addUserSchema>;

export const addBookingSchema = z.object({
  nama: z.string().min(1, "nama perlu diisi"),
  email: z.string().min(1, "email perlu diisi").email("email tidak valid"),
  hp: z
    .string()
    .optional()
    .refine((val) => !val || isMobilePhone(val), "nomor hp tidak valid"),
  jumlah: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(1), { description: "jumlah perlu diisi" }
  ),
  instagram: z.string().min(1, "instagram perlu diisi"),
  warna: z.string().min(1, "warna perlu diisi"),
  peliharaan: z.preprocess(
    (val) => val == "true",
    z.boolean(), { description: "peliharaan perlu diisi" }
  ),
  voucher: z.string().optional(),

  tanggal: z.preprocess(
    val => new Date(val as string),
    z.date(), { description: "tanggal perlu diisi" }
  ),
  katalog: KatalogSchema,
})

export type AddBookingSchema = z.infer<typeof addBookingSchema>;
