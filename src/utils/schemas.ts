import { z } from "zod";
import { roles } from "~/utils/roles";
import isMobilePhone from "validator/lib/isMobilePhone";

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
