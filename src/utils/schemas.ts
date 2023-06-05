import { z } from "zod";
import { roles } from "~/utils/roles";
import isMobilePhone from "validator/lib/isMobilePhone";
import { KatalogSchema, BookingSchema } from "~/utils/zod-prisma";

export const addUserSchema = z.object({
  nama: z.string().min(1, "nama perlu diisi"),
  email: z.string().min(1, "email perlu diisi").email("email tidak valid"),
  hp: z
    .string()
    .optional()
    .refine(
      (val) => !val || isMobilePhone(val, "id-ID"),
      "nomor hp tidak valid"
    ),
  role: z.enum(roles),
});

export type AddUserSchema = z.infer<typeof addUserSchema>;

export const addBookingSchema = z.object({
  nama: z.string().min(1, "nama perlu diisi"),
  email: z.string().min(1, "email perlu diisi").email("email tidak valid"),
  hp: z
    .string()
    .min(1, "nomor hp perlu diisi")
    .refine((val) => !val || isMobilePhone(val), "nomor hp tidak valid"),
  jumlahOrang: z.number().min(1, "jumlah harus diisi"),
  instagram: z.string().min(1, "instagram perlu diisi"),
  warna: z.string().min(1, "warna perlu diisi"),
  peliharaan: z.boolean(),
  kupon: z.string().optional(),

  tanggal: z.date(),
  katalog: KatalogSchema,
});

export type AddBookingSchema = z.infer<typeof addBookingSchema>;

export const addCatalogueSchema = z.object({
  nama: z.string().min(1, "nama perlu diisi"),
  durasi: z.number().min(1, "durasi perlu diisi"),
  jumlahOrang: z.number().min(1, "jumlah orang harus positif").optional(),
  harga: z.number().min(1, "harga harus diisi"),
  deskripsi: z.string().min(1, "deskripsi perlu diisi"),
});

export type AddCatalogueSchema = z.infer<typeof addCatalogueSchema>;

export const updateCatalogueSchema = z.object({
  id: z.string().cuid().min(1, "id perlu diisi"),
  nama: z.string().min(1, "nama perlu diisi"),
  durasi: z.number().min(1, "durasi perlu diisi"),
  jumlahOrang: z.number().min(1, "jumlah orang harus positif").optional(),
  harga: z.number().min(1, "harga harus diisi"),
  deskripsi: z.string().min(1, "deskripsi perlu diisi"),
});

export type UpdateCatalogueSchema = z.infer<typeof updateCatalogueSchema>;

export const addPembayaranSchema = z.object({
  dp: z.boolean(),
  jumlah: z.number().min(1, "jumlah harus diisi"),
  // jumlah: z.preprocess(
  //   (val) => {
  //     console.log("val", val)
  //     if (!val || typeof val !== "string") return 0
  //     // @ts-ignore
  //     let str = val.replace(/\,/g, "")
  //     console.log("str", str)
  //     // @ts-ignore
  //     let int = parseInt(str, 10)
  //     console.log("int", int)
  //     return int
  //   },
  //   z.number().min(1, "jumlah harus diisi"),
  // ),
  //
  booking: z.string().cuid().min(1, "booking harus diisi"),
});

export type AddPembayaranSchema = z.infer<typeof addPembayaranSchema>;

export const addPertanyaanFeedbackSchema = z.object({
  pertanyaan: z.string().min(1, "pertanyaan perlu diisi"),
});

export type AddPertanyaanFeedbackSchema = z.infer<
  typeof addPertanyaanFeedbackSchema
>;

export const addFeedbackSchema = z.object({
  namaPenulis: z.string().min(0, "Nama perlu diisi"),
  isiFeedback: z.string().min(1, "Feedback perlu diisi"),
});

export type AddFeedbackSchema = z.infer<typeof addFeedbackSchema>;

export const addCommentSchema = z.object({
  id: z.string(),
  isi: z.string().min(1, "komentar perlu diisi"),
});

export type AddCommentSchema = z.infer<typeof addCommentSchema>;

export const updateFeedbackSchema =  z.object({
  id: z.string().cuid().min(1, "id perlu diisi"),
  namaPenulis: z.string().min(0, "Nama perlu diisi"),
  isiFeedback: z.string().min(1, "Feedback perlu diisi"),
})

export type UpdateFeedbackSchema = z.infer<typeof updateFeedbackSchema>;
