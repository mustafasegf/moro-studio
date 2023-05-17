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
    .string().min(1, "nomor hp perlu diisi")
    .refine((val) => !val || isMobilePhone(val), "nomor hp tidak valid"),
  jumlahOrang: z.number().min(1, "jumlah harus diisi"),
  instagram: z.string().min(1, "instagram perlu diisi"),
  warna: z.string().min(1, "warna perlu diisi"),
  peliharaan: z.boolean(),
  kupon: z.string().optional(),

  tanggal: z.date(),
  katalog: KatalogSchema,
})

export type AddBookingSchema = z.infer<typeof addBookingSchema>;

export const addCatalogueSchema =  z.object({
  nama: z.string().min(1, "nama perlu diisi"),
  durasi: z.number().min(1, "durasi perlu diisi"),
  jumlahOrang: z.number().min(1, "jumlah orang harus positif").optional(),
  harga: z.number().min(1, "harga harus diisi"),
  deskripsi: z.string().min(1, "deskripsi perlu diisi"),
})

export type AddCatalogueSchema = z.infer<typeof addCatalogueSchema>;


export const updateCatalogueSchema =  z.object({
  id: z.string().cuid().min(1, "id perlu diisi"),
  nama: z.string().min(1, "nama perlu diisi"),
  durasi: z.number().min(1, "durasi perlu diisi"),
  jumlahOrang: z.number().min(1, "jumlah orang harus positif").optional(),
  harga: z.number().min(1, "harga harus diisi"),
  deskripsi: z.string().min(1, "deskripsi perlu diisi"),
})

export type UpdateCatalogueSchema = z.infer<typeof updateCatalogueSchema>;


export const addPertanyaanFeedbackSchema =  z.object({
  pertanyaan: z.string().min(1, "pertanyaan perlu diisi"),
})

export type AddPertanyaanFeedbackSchema = z.infer<typeof addPertanyaanFeedbackSchema>;
