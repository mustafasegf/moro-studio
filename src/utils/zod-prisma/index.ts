import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const BackgroundFotoScalarFieldEnumSchema = z.enum(['warna','createdAt','updatedAt','deleted']);

export const BlastMarketingScalarFieldEnumSchema = z.enum(['id','subjek','isi','createdAt','updatedAt']);

export const BookingScalarFieldEnumSchema = z.enum(['id','userId','backgroundWarna','peliharaan','harga','jadwal','durasi','jumlahOrang','katalogId','kuponId','status','createdAt','updatedAt','deleted']);

export const ChatRoomScalarFieldEnumSchema = z.enum(['Id','adminId','userId','createdAt','updatedAt']);

export const ChatScalarFieldEnumSchema = z.enum(['id','chatRoomId','chat','adminSend','createdAt','updatedAt']);

export const CommentBlogScalarFieldEnumSchema = z.enum(['id','kontenBlogId','nama','isi','like','dislike','createdAt','updatedAt']);

export const ContohImageScalarFieldEnumSchema = z.enum(['id','userId']);

export const ContohScalarFieldEnumSchema = z.enum(['id','email']);

export const FeedbackAnswerScalarFieldEnumSchema = z.enum(['id','feedbackId','feedbackQuestionId','answer']);

export const FeedbackQuestionScalarFieldEnumSchema = z.enum(['id','pertanyaan','createdAt','updatedAt']);

export const FeedbackScalarFieldEnumSchema = z.enum(['id','userId','isiFeedback','namaPenulis','createdAt','updatedAt']);

export const FotoUserScalarFieldEnumSchema = z.enum(['id','bookingId','userId','createdAt','updatedAt']);

export const GambarBlogScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt']);

export const HomeScalarFieldEnumSchema = z.enum(['id','image','carousel','createdAt','updatedAt']);

export const KatalogScalarFieldEnumSchema = z.enum(['id','nama','durasi','harga','jumlahOrang','deskripsi','createdAt','updatedAt','deleted']);

export const KontenBlogScalarFieldEnumSchema = z.enum(['id','judul','isi','posted','like','gambarBlogId','createdAt','updatedAt']);

export const KuponScalarFieldEnumSchema = z.enum(['id','nama','kode','diskon','kuotaPemakaian','kuotaTerpakai','active','tanggal','createdAt','updatedAt']);

export const PembayaranScalarFieldEnumSchema = z.enum(['id','bookingId','dp','jumlah','createdAt','updatedAt']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','nama','email','hp','instagram','role','createdAt','updatedAt','deleted']);

export const RoleSchema = z.enum(['admin','studioManager','blogManager','user']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const BookinStatusSchema = z.enum(['booked','dp','lunas']);

export type BookinStatusType = `${z.infer<typeof BookinStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().nullable(),
  instagram: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// KATALOG SCHEMA
/////////////////////////////////////////

export const KatalogSchema = z.object({
  id: z.string().cuid(),
  nama: z.string(),
  durasi: z.number().int(),
  harga: z.number().int(),
  jumlahOrang: z.number().int().nullable(),
  deskripsi: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
})

export type Katalog = z.infer<typeof KatalogSchema>

/////////////////////////////////////////
// KUPON SCHEMA
/////////////////////////////////////////

export const KuponSchema = z.object({
  id: z.string().cuid(),
  nama: z.string(),
  kode: z.string(),
  diskon: z.number(),
  kuotaPemakaian: z.number().int(),
  kuotaTerpakai: z.number().int(),
  active: z.boolean(),
  tanggal: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Kupon = z.infer<typeof KuponSchema>

/////////////////////////////////////////
// BACKGROUND FOTO SCHEMA
/////////////////////////////////////////

export const BackgroundFotoSchema = z.object({
  warna: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
})

export type BackgroundFoto = z.infer<typeof BackgroundFotoSchema>

/////////////////////////////////////////
// BOOKING SCHEMA
/////////////////////////////////////////

export const BookingSchema = z.object({
  status: BookinStatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalogId: z.string(),
  kuponId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
})

export type Booking = z.infer<typeof BookingSchema>

/////////////////////////////////////////
// PEMBAYARAN SCHEMA
/////////////////////////////////////////

export const PembayaranSchema = z.object({
  id: z.string().cuid(),
  bookingId: z.string(),
  dp: z.boolean(),
  jumlah: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Pembayaran = z.infer<typeof PembayaranSchema>

/////////////////////////////////////////
// FOTO USER SCHEMA
/////////////////////////////////////////

export const FotoUserSchema = z.object({
  id: z.string().cuid(),
  bookingId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FotoUser = z.infer<typeof FotoUserSchema>

/////////////////////////////////////////
// KONTEN BLOG SCHEMA
/////////////////////////////////////////

export const KontenBlogSchema = z.object({
  id: z.string().cuid(),
  judul: z.string(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number().int(),
  gambarBlogId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type KontenBlog = z.infer<typeof KontenBlogSchema>

/////////////////////////////////////////
// GAMBAR BLOG SCHEMA
/////////////////////////////////////////

export const GambarBlogSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type GambarBlog = z.infer<typeof GambarBlogSchema>

/////////////////////////////////////////
// COMMENT BLOG SCHEMA
/////////////////////////////////////////

export const CommentBlogSchema = z.object({
  id: z.string().cuid(),
  kontenBlogId: z.string(),
  nama: z.string(),
  isi: z.string(),
  like: z.number().int(),
  dislike: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CommentBlog = z.infer<typeof CommentBlogSchema>

/////////////////////////////////////////
// BLAST MARKETING SCHEMA
/////////////////////////////////////////

export const BlastMarketingSchema = z.object({
  id: z.string().cuid(),
  subjek: z.string(),
  isi: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type BlastMarketing = z.infer<typeof BlastMarketingSchema>

/////////////////////////////////////////
// HOME SCHEMA
/////////////////////////////////////////

export const HomeSchema = z.object({
  id: z.string().cuid(),
  image: z.string(),
  carousel: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Home = z.infer<typeof HomeSchema>

/////////////////////////////////////////
// CHAT ROOM SCHEMA
/////////////////////////////////////////

export const ChatRoomSchema = z.object({
  Id: z.string().cuid(),
  adminId: z.string(),
  userId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ChatRoom = z.infer<typeof ChatRoomSchema>

/////////////////////////////////////////
// CHAT SCHEMA
/////////////////////////////////////////

export const ChatSchema = z.object({
  id: z.string().cuid(),
  chatRoomId: z.string(),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Chat = z.infer<typeof ChatSchema>

/////////////////////////////////////////
// FEEDBACK SCHEMA
/////////////////////////////////////////

export const FeedbackSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Feedback = z.infer<typeof FeedbackSchema>

/////////////////////////////////////////
// FEEDBACK ANSWER SCHEMA
/////////////////////////////////////////

export const FeedbackAnswerSchema = z.object({
  id: z.string().cuid(),
  feedbackId: z.string(),
  feedbackQuestionId: z.string(),
  answer: z.string().nullable(),
})

export type FeedbackAnswer = z.infer<typeof FeedbackAnswerSchema>

/////////////////////////////////////////
// FEEDBACK QUESTION SCHEMA
/////////////////////////////////////////

export const FeedbackQuestionSchema = z.object({
  id: z.string().cuid(),
  pertanyaan: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FeedbackQuestion = z.infer<typeof FeedbackQuestionSchema>

/////////////////////////////////////////
// CONTOH SCHEMA
/////////////////////////////////////////

export const ContohSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
})

export type Contoh = z.infer<typeof ContohSchema>

/////////////////////////////////////////
// CONTOH IMAGE SCHEMA
/////////////////////////////////////////

export const ContohImageSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
})

export type ContohImage = z.infer<typeof ContohImageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  blastMarketing: z.union([z.boolean(),z.lazy(() => BlastMarketingFindManyArgsSchema)]).optional(),
  chatRoomAdmin: z.union([z.boolean(),z.lazy(() => ChatRoomFindManyArgsSchema)]).optional(),
  chatRoomUser: z.union([z.boolean(),z.lazy(() => ChatRoomFindManyArgsSchema)]).optional(),
  ContohImage: z.union([z.boolean(),z.lazy(() => ContohImageFindManyArgsSchema)]).optional(),
  Feedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  FotoUser: z.union([z.boolean(),z.lazy(() => FotoUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  booking: z.boolean().optional(),
  blastMarketing: z.boolean().optional(),
  chatRoomAdmin: z.boolean().optional(),
  chatRoomUser: z.boolean().optional(),
  ContohImage: z.boolean().optional(),
  Feedback: z.boolean().optional(),
  FotoUser: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  nama: z.boolean().optional(),
  email: z.boolean().optional(),
  hp: z.boolean().optional(),
  instagram: z.boolean().optional(),
  role: z.boolean().optional(),
  booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  blastMarketing: z.union([z.boolean(),z.lazy(() => BlastMarketingFindManyArgsSchema)]).optional(),
  chatRoomAdmin: z.union([z.boolean(),z.lazy(() => ChatRoomFindManyArgsSchema)]).optional(),
  chatRoomUser: z.union([z.boolean(),z.lazy(() => ChatRoomFindManyArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.union([z.boolean(),z.lazy(() => ContohImageFindManyArgsSchema)]).optional(),
  Feedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  FotoUser: z.union([z.boolean(),z.lazy(() => FotoUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// KATALOG
//------------------------------------------------------

export const KatalogIncludeSchema: z.ZodType<Prisma.KatalogInclude> = z.object({
  Booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KatalogCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const KatalogArgsSchema: z.ZodType<Prisma.KatalogArgs> = z.object({
  select: z.lazy(() => KatalogSelectSchema).optional(),
  include: z.lazy(() => KatalogIncludeSchema).optional(),
}).strict();

export const KatalogCountOutputTypeArgsSchema: z.ZodType<Prisma.KatalogCountOutputTypeArgs> = z.object({
  select: z.lazy(() => KatalogCountOutputTypeSelectSchema).nullish(),
}).strict();

export const KatalogCountOutputTypeSelectSchema: z.ZodType<Prisma.KatalogCountOutputTypeSelect> = z.object({
  Booking: z.boolean().optional(),
}).strict();

export const KatalogSelectSchema: z.ZodType<Prisma.KatalogSelect> = z.object({
  id: z.boolean().optional(),
  nama: z.boolean().optional(),
  durasi: z.boolean().optional(),
  harga: z.boolean().optional(),
  jumlahOrang: z.boolean().optional(),
  deskripsi: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  deleted: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => KatalogCountOutputTypeArgsSchema)]).optional(),
}).strict()

// KUPON
//------------------------------------------------------

export const KuponIncludeSchema: z.ZodType<Prisma.KuponInclude> = z.object({
  Booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KuponCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const KuponArgsSchema: z.ZodType<Prisma.KuponArgs> = z.object({
  select: z.lazy(() => KuponSelectSchema).optional(),
  include: z.lazy(() => KuponIncludeSchema).optional(),
}).strict();

export const KuponCountOutputTypeArgsSchema: z.ZodType<Prisma.KuponCountOutputTypeArgs> = z.object({
  select: z.lazy(() => KuponCountOutputTypeSelectSchema).nullish(),
}).strict();

export const KuponCountOutputTypeSelectSchema: z.ZodType<Prisma.KuponCountOutputTypeSelect> = z.object({
  Booking: z.boolean().optional(),
}).strict();

export const KuponSelectSchema: z.ZodType<Prisma.KuponSelect> = z.object({
  id: z.boolean().optional(),
  nama: z.boolean().optional(),
  kode: z.boolean().optional(),
  diskon: z.boolean().optional(),
  kuotaPemakaian: z.boolean().optional(),
  kuotaTerpakai: z.boolean().optional(),
  active: z.boolean().optional(),
  tanggal: z.boolean().optional(),
  Booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => KuponCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACKGROUND FOTO
//------------------------------------------------------

export const BackgroundFotoIncludeSchema: z.ZodType<Prisma.BackgroundFotoInclude> = z.object({
  Booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BackgroundFotoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BackgroundFotoArgsSchema: z.ZodType<Prisma.BackgroundFotoArgs> = z.object({
  select: z.lazy(() => BackgroundFotoSelectSchema).optional(),
  include: z.lazy(() => BackgroundFotoIncludeSchema).optional(),
}).strict();

export const BackgroundFotoCountOutputTypeArgsSchema: z.ZodType<Prisma.BackgroundFotoCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BackgroundFotoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BackgroundFotoCountOutputTypeSelectSchema: z.ZodType<Prisma.BackgroundFotoCountOutputTypeSelect> = z.object({
  Booking: z.boolean().optional(),
}).strict();

export const BackgroundFotoSelectSchema: z.ZodType<Prisma.BackgroundFotoSelect> = z.object({
  warna: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Booking: z.union([z.boolean(),z.lazy(() => BookingFindManyArgsSchema)]).optional(),
  deleted: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => BackgroundFotoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BOOKING
//------------------------------------------------------

export const BookingIncludeSchema: z.ZodType<Prisma.BookingInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  background: z.union([z.boolean(),z.lazy(() => BackgroundFotoArgsSchema)]).optional(),
  katalog: z.union([z.boolean(),z.lazy(() => KatalogArgsSchema)]).optional(),
  kupon: z.union([z.boolean(),z.lazy(() => KuponArgsSchema)]).optional(),
  Pembayaran: z.union([z.boolean(),z.lazy(() => PembayaranFindManyArgsSchema)]).optional(),
  fotoUser: z.union([z.boolean(),z.lazy(() => FotoUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BookingCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BookingArgsSchema: z.ZodType<Prisma.BookingArgs> = z.object({
  select: z.lazy(() => BookingSelectSchema).optional(),
  include: z.lazy(() => BookingIncludeSchema).optional(),
}).strict();

export const BookingCountOutputTypeArgsSchema: z.ZodType<Prisma.BookingCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BookingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BookingCountOutputTypeSelectSchema: z.ZodType<Prisma.BookingCountOutputTypeSelect> = z.object({
  Pembayaran: z.boolean().optional(),
  fotoUser: z.boolean().optional(),
}).strict();

export const BookingSelectSchema: z.ZodType<Prisma.BookingSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  backgroundWarna: z.boolean().optional(),
  background: z.union([z.boolean(),z.lazy(() => BackgroundFotoArgsSchema)]).optional(),
  peliharaan: z.boolean().optional(),
  harga: z.boolean().optional(),
  jadwal: z.boolean().optional(),
  durasi: z.boolean().optional(),
  jumlahOrang: z.boolean().optional(),
  katalogId: z.boolean().optional(),
  katalog: z.union([z.boolean(),z.lazy(() => KatalogArgsSchema)]).optional(),
  kuponId: z.boolean().optional(),
  kupon: z.union([z.boolean(),z.lazy(() => KuponArgsSchema)]).optional(),
  status: z.boolean().optional(),
  Pembayaran: z.union([z.boolean(),z.lazy(() => PembayaranFindManyArgsSchema)]).optional(),
  fotoUser: z.union([z.boolean(),z.lazy(() => FotoUserFindManyArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deleted: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => BookingCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PEMBAYARAN
//------------------------------------------------------

export const PembayaranIncludeSchema: z.ZodType<Prisma.PembayaranInclude> = z.object({
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
}).strict()

export const PembayaranArgsSchema: z.ZodType<Prisma.PembayaranArgs> = z.object({
  select: z.lazy(() => PembayaranSelectSchema).optional(),
  include: z.lazy(() => PembayaranIncludeSchema).optional(),
}).strict();

export const PembayaranSelectSchema: z.ZodType<Prisma.PembayaranSelect> = z.object({
  id: z.boolean().optional(),
  bookingId: z.boolean().optional(),
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
  dp: z.boolean().optional(),
  jumlah: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// FOTO USER
//------------------------------------------------------

export const FotoUserIncludeSchema: z.ZodType<Prisma.FotoUserInclude> = z.object({
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FotoUserArgsSchema: z.ZodType<Prisma.FotoUserArgs> = z.object({
  select: z.lazy(() => FotoUserSelectSchema).optional(),
  include: z.lazy(() => FotoUserIncludeSchema).optional(),
}).strict();

export const FotoUserSelectSchema: z.ZodType<Prisma.FotoUserSelect> = z.object({
  id: z.boolean().optional(),
  bookingId: z.boolean().optional(),
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// KONTEN BLOG
//------------------------------------------------------

export const KontenBlogIncludeSchema: z.ZodType<Prisma.KontenBlogInclude> = z.object({
  comment: z.union([z.boolean(),z.lazy(() => CommentBlogFindManyArgsSchema)]).optional(),
  gambarBlog: z.union([z.boolean(),z.lazy(() => GambarBlogArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KontenBlogCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const KontenBlogArgsSchema: z.ZodType<Prisma.KontenBlogArgs> = z.object({
  select: z.lazy(() => KontenBlogSelectSchema).optional(),
  include: z.lazy(() => KontenBlogIncludeSchema).optional(),
}).strict();

export const KontenBlogCountOutputTypeArgsSchema: z.ZodType<Prisma.KontenBlogCountOutputTypeArgs> = z.object({
  select: z.lazy(() => KontenBlogCountOutputTypeSelectSchema).nullish(),
}).strict();

export const KontenBlogCountOutputTypeSelectSchema: z.ZodType<Prisma.KontenBlogCountOutputTypeSelect> = z.object({
  comment: z.boolean().optional(),
}).strict();

export const KontenBlogSelectSchema: z.ZodType<Prisma.KontenBlogSelect> = z.object({
  id: z.boolean().optional(),
  judul: z.boolean().optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentBlogFindManyArgsSchema)]).optional(),
  isi: z.boolean().optional(),
  posted: z.boolean().optional(),
  like: z.boolean().optional(),
  gambarBlogId: z.boolean().optional(),
  gambarBlog: z.union([z.boolean(),z.lazy(() => GambarBlogArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => KontenBlogCountOutputTypeArgsSchema)]).optional(),
}).strict()

// GAMBAR BLOG
//------------------------------------------------------

export const GambarBlogIncludeSchema: z.ZodType<Prisma.GambarBlogInclude> = z.object({
  KontenBlog: z.union([z.boolean(),z.lazy(() => KontenBlogArgsSchema)]).optional(),
}).strict()

export const GambarBlogArgsSchema: z.ZodType<Prisma.GambarBlogArgs> = z.object({
  select: z.lazy(() => GambarBlogSelectSchema).optional(),
  include: z.lazy(() => GambarBlogIncludeSchema).optional(),
}).strict();

export const GambarBlogSelectSchema: z.ZodType<Prisma.GambarBlogSelect> = z.object({
  id: z.boolean().optional(),
  KontenBlog: z.union([z.boolean(),z.lazy(() => KontenBlogArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// COMMENT BLOG
//------------------------------------------------------

export const CommentBlogIncludeSchema: z.ZodType<Prisma.CommentBlogInclude> = z.object({
  kontenBlog: z.union([z.boolean(),z.lazy(() => KontenBlogArgsSchema)]).optional(),
}).strict()

export const CommentBlogArgsSchema: z.ZodType<Prisma.CommentBlogArgs> = z.object({
  select: z.lazy(() => CommentBlogSelectSchema).optional(),
  include: z.lazy(() => CommentBlogIncludeSchema).optional(),
}).strict();

export const CommentBlogSelectSchema: z.ZodType<Prisma.CommentBlogSelect> = z.object({
  id: z.boolean().optional(),
  kontenBlogId: z.boolean().optional(),
  kontenBlog: z.union([z.boolean(),z.lazy(() => KontenBlogArgsSchema)]).optional(),
  nama: z.boolean().optional(),
  isi: z.boolean().optional(),
  like: z.boolean().optional(),
  dislike: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// BLAST MARKETING
//------------------------------------------------------

export const BlastMarketingIncludeSchema: z.ZodType<Prisma.BlastMarketingInclude> = z.object({
  penerima: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BlastMarketingCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BlastMarketingArgsSchema: z.ZodType<Prisma.BlastMarketingArgs> = z.object({
  select: z.lazy(() => BlastMarketingSelectSchema).optional(),
  include: z.lazy(() => BlastMarketingIncludeSchema).optional(),
}).strict();

export const BlastMarketingCountOutputTypeArgsSchema: z.ZodType<Prisma.BlastMarketingCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BlastMarketingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BlastMarketingCountOutputTypeSelectSchema: z.ZodType<Prisma.BlastMarketingCountOutputTypeSelect> = z.object({
  penerima: z.boolean().optional(),
}).strict();

export const BlastMarketingSelectSchema: z.ZodType<Prisma.BlastMarketingSelect> = z.object({
  id: z.boolean().optional(),
  subjek: z.boolean().optional(),
  isi: z.boolean().optional(),
  penerima: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => BlastMarketingCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HOME
//------------------------------------------------------

export const HomeSelectSchema: z.ZodType<Prisma.HomeSelect> = z.object({
  id: z.boolean().optional(),
  image: z.boolean().optional(),
  carousel: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// CHAT ROOM
//------------------------------------------------------

export const ChatRoomIncludeSchema: z.ZodType<Prisma.ChatRoomInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Chat: z.union([z.boolean(),z.lazy(() => ChatFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatRoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChatRoomArgsSchema: z.ZodType<Prisma.ChatRoomArgs> = z.object({
  select: z.lazy(() => ChatRoomSelectSchema).optional(),
  include: z.lazy(() => ChatRoomIncludeSchema).optional(),
}).strict();

export const ChatRoomCountOutputTypeArgsSchema: z.ZodType<Prisma.ChatRoomCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ChatRoomCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChatRoomCountOutputTypeSelectSchema: z.ZodType<Prisma.ChatRoomCountOutputTypeSelect> = z.object({
  Chat: z.boolean().optional(),
}).strict();

export const ChatRoomSelectSchema: z.ZodType<Prisma.ChatRoomSelect> = z.object({
  Id: z.boolean().optional(),
  adminId: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Chat: z.union([z.boolean(),z.lazy(() => ChatFindManyArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatRoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAT
//------------------------------------------------------

export const ChatIncludeSchema: z.ZodType<Prisma.ChatInclude> = z.object({
  chatRoom: z.union([z.boolean(),z.lazy(() => ChatRoomArgsSchema)]).optional(),
}).strict()

export const ChatArgsSchema: z.ZodType<Prisma.ChatArgs> = z.object({
  select: z.lazy(() => ChatSelectSchema).optional(),
  include: z.lazy(() => ChatIncludeSchema).optional(),
}).strict();

export const ChatSelectSchema: z.ZodType<Prisma.ChatSelect> = z.object({
  id: z.boolean().optional(),
  chatRoomId: z.boolean().optional(),
  chatRoom: z.union([z.boolean(),z.lazy(() => ChatRoomArgsSchema)]).optional(),
  chat: z.boolean().optional(),
  adminSend: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// FEEDBACK
//------------------------------------------------------

export const FeedbackIncludeSchema: z.ZodType<Prisma.FeedbackInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  feedbackAnswer: z.union([z.boolean(),z.lazy(() => FeedbackAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FeedbackArgsSchema: z.ZodType<Prisma.FeedbackArgs> = z.object({
  select: z.lazy(() => FeedbackSelectSchema).optional(),
  include: z.lazy(() => FeedbackIncludeSchema).optional(),
}).strict();

export const FeedbackCountOutputTypeArgsSchema: z.ZodType<Prisma.FeedbackCountOutputTypeArgs> = z.object({
  select: z.lazy(() => FeedbackCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FeedbackCountOutputTypeSelectSchema: z.ZodType<Prisma.FeedbackCountOutputTypeSelect> = z.object({
  feedbackAnswer: z.boolean().optional(),
}).strict();

export const FeedbackSelectSchema: z.ZodType<Prisma.FeedbackSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  isiFeedback: z.boolean().optional(),
  namaPenulis: z.boolean().optional(),
  feedbackAnswer: z.union([z.boolean(),z.lazy(() => FeedbackAnswerFindManyArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEEDBACK ANSWER
//------------------------------------------------------

export const FeedbackAnswerIncludeSchema: z.ZodType<Prisma.FeedbackAnswerInclude> = z.object({
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackArgsSchema)]).optional(),
  question: z.union([z.boolean(),z.lazy(() => FeedbackQuestionArgsSchema)]).optional(),
}).strict()

export const FeedbackAnswerArgsSchema: z.ZodType<Prisma.FeedbackAnswerArgs> = z.object({
  select: z.lazy(() => FeedbackAnswerSelectSchema).optional(),
  include: z.lazy(() => FeedbackAnswerIncludeSchema).optional(),
}).strict();

export const FeedbackAnswerSelectSchema: z.ZodType<Prisma.FeedbackAnswerSelect> = z.object({
  id: z.boolean().optional(),
  feedbackId: z.boolean().optional(),
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackArgsSchema)]).optional(),
  feedbackQuestionId: z.boolean().optional(),
  question: z.union([z.boolean(),z.lazy(() => FeedbackQuestionArgsSchema)]).optional(),
  answer: z.boolean().optional(),
}).strict()

// FEEDBACK QUESTION
//------------------------------------------------------

export const FeedbackQuestionIncludeSchema: z.ZodType<Prisma.FeedbackQuestionInclude> = z.object({
  FeedbackAnswer: z.union([z.boolean(),z.lazy(() => FeedbackAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackQuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FeedbackQuestionArgsSchema: z.ZodType<Prisma.FeedbackQuestionArgs> = z.object({
  select: z.lazy(() => FeedbackQuestionSelectSchema).optional(),
  include: z.lazy(() => FeedbackQuestionIncludeSchema).optional(),
}).strict();

export const FeedbackQuestionCountOutputTypeArgsSchema: z.ZodType<Prisma.FeedbackQuestionCountOutputTypeArgs> = z.object({
  select: z.lazy(() => FeedbackQuestionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FeedbackQuestionCountOutputTypeSelectSchema: z.ZodType<Prisma.FeedbackQuestionCountOutputTypeSelect> = z.object({
  FeedbackAnswer: z.boolean().optional(),
}).strict();

export const FeedbackQuestionSelectSchema: z.ZodType<Prisma.FeedbackQuestionSelect> = z.object({
  id: z.boolean().optional(),
  pertanyaan: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  FeedbackAnswer: z.union([z.boolean(),z.lazy(() => FeedbackAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackQuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTOH
//------------------------------------------------------

export const ContohSelectSchema: z.ZodType<Prisma.ContohSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
}).strict()

// CONTOH IMAGE
//------------------------------------------------------

export const ContohImageIncludeSchema: z.ZodType<Prisma.ContohImageInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ContohImageArgsSchema: z.ZodType<Prisma.ContohImageArgs> = z.object({
  select: z.lazy(() => ContohImageSelectSchema).optional(),
  include: z.lazy(() => ContohImageIncludeSchema).optional(),
}).strict();

export const ContohImageSelectSchema: z.ZodType<Prisma.ContohImageSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hp: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  booking: z.lazy(() => BookingListRelationFilterSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingListRelationFilterSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomListRelationFilterSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomListRelationFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ContohImage: z.lazy(() => ContohImageListRelationFilterSchema).optional(),
  Feedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  FotoUser: z.lazy(() => FotoUserListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  booking: z.lazy(() => BookingOrderByRelationAggregateInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingOrderByRelationAggregateInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomOrderByRelationAggregateInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomOrderByRelationAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  ContohImage: z.lazy(() => ContohImageOrderByRelationAggregateInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackOrderByRelationAggregateInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hp: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const KatalogWhereInputSchema: z.ZodType<Prisma.KatalogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KatalogWhereInputSchema),z.lazy(() => KatalogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KatalogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KatalogWhereInputSchema),z.lazy(() => KatalogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  durasi: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  harga: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jumlahOrang: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  deskripsi: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Booking: z.lazy(() => BookingListRelationFilterSchema).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const KatalogOrderByWithRelationInputSchema: z.ZodType<Prisma.KatalogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  deskripsi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Booking: z.lazy(() => BookingOrderByRelationAggregateInputSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KatalogWhereUniqueInputSchema: z.ZodType<Prisma.KatalogWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const KatalogOrderByWithAggregationInputSchema: z.ZodType<Prisma.KatalogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  deskripsi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KatalogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KatalogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KatalogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KatalogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KatalogSumOrderByAggregateInputSchema).optional()
}).strict();

export const KatalogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KatalogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KatalogScalarWhereWithAggregatesInputSchema),z.lazy(() => KatalogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KatalogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KatalogScalarWhereWithAggregatesInputSchema),z.lazy(() => KatalogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  durasi: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  harga: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  jumlahOrang: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  deskripsi: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const KuponWhereInputSchema: z.ZodType<Prisma.KuponWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KuponWhereInputSchema),z.lazy(() => KuponWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KuponWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KuponWhereInputSchema),z.lazy(() => KuponWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  diskon: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  kuotaPemakaian: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  kuotaTerpakai: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  tanggal: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Booking: z.lazy(() => BookingListRelationFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const KuponOrderByWithRelationInputSchema: z.ZodType<Prisma.KuponOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  kode: z.lazy(() => SortOrderSchema).optional(),
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  tanggal: z.lazy(() => SortOrderSchema).optional(),
  Booking: z.lazy(() => BookingOrderByRelationAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KuponWhereUniqueInputSchema: z.ZodType<Prisma.KuponWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  kode: z.string().optional()
}).strict();

export const KuponOrderByWithAggregationInputSchema: z.ZodType<Prisma.KuponOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  kode: z.lazy(() => SortOrderSchema).optional(),
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  tanggal: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KuponCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KuponAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KuponMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KuponMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KuponSumOrderByAggregateInputSchema).optional()
}).strict();

export const KuponScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KuponScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KuponScalarWhereWithAggregatesInputSchema),z.lazy(() => KuponScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KuponScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KuponScalarWhereWithAggregatesInputSchema),z.lazy(() => KuponScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  kode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  diskon: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  kuotaPemakaian: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  kuotaTerpakai: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  tanggal: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BackgroundFotoWhereInputSchema: z.ZodType<Prisma.BackgroundFotoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BackgroundFotoWhereInputSchema),z.lazy(() => BackgroundFotoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BackgroundFotoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BackgroundFotoWhereInputSchema),z.lazy(() => BackgroundFotoWhereInputSchema).array() ]).optional(),
  warna: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Booking: z.lazy(() => BookingListRelationFilterSchema).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const BackgroundFotoOrderByWithRelationInputSchema: z.ZodType<Prisma.BackgroundFotoOrderByWithRelationInput> = z.object({
  warna: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Booking: z.lazy(() => BookingOrderByRelationAggregateInputSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BackgroundFotoWhereUniqueInputSchema: z.ZodType<Prisma.BackgroundFotoWhereUniqueInput> = z.object({
  warna: z.string().optional()
}).strict();

export const BackgroundFotoOrderByWithAggregationInputSchema: z.ZodType<Prisma.BackgroundFotoOrderByWithAggregationInput> = z.object({
  warna: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BackgroundFotoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BackgroundFotoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BackgroundFotoMinOrderByAggregateInputSchema).optional()
}).strict();

export const BackgroundFotoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BackgroundFotoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BackgroundFotoScalarWhereWithAggregatesInputSchema),z.lazy(() => BackgroundFotoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BackgroundFotoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BackgroundFotoScalarWhereWithAggregatesInputSchema),z.lazy(() => BackgroundFotoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  warna: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const BookingWhereInputSchema: z.ZodType<Prisma.BookingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  background: z.union([ z.lazy(() => BackgroundFotoRelationFilterSchema),z.lazy(() => BackgroundFotoWhereInputSchema) ]).optional(),
  peliharaan: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  harga: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jadwal: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  durasi: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jumlahOrang: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  katalogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  katalog: z.union([ z.lazy(() => KatalogRelationFilterSchema),z.lazy(() => KatalogWhereInputSchema) ]).optional(),
  kuponId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  kupon: z.union([ z.lazy(() => KuponRelationFilterSchema),z.lazy(() => KuponWhereInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookinStatusFilterSchema),z.lazy(() => BookinStatusSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranListRelationFilterSchema).optional(),
  fotoUser: z.lazy(() => FotoUserListRelationFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const BookingOrderByWithRelationInputSchema: z.ZodType<Prisma.BookingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  backgroundWarna: z.lazy(() => SortOrderSchema).optional(),
  background: z.lazy(() => BackgroundFotoOrderByWithRelationInputSchema).optional(),
  peliharaan: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jadwal: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  katalogId: z.lazy(() => SortOrderSchema).optional(),
  katalog: z.lazy(() => KatalogOrderByWithRelationInputSchema).optional(),
  kuponId: z.lazy(() => SortOrderSchema).optional(),
  kupon: z.lazy(() => KuponOrderByWithRelationInputSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  Pembayaran: z.lazy(() => PembayaranOrderByRelationAggregateInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserOrderByRelationAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingWhereUniqueInputSchema: z.ZodType<Prisma.BookingWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const BookingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  backgroundWarna: z.lazy(() => SortOrderSchema).optional(),
  peliharaan: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jadwal: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  katalogId: z.lazy(() => SortOrderSchema).optional(),
  kuponId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BookingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BookingSumOrderByAggregateInputSchema).optional()
}).strict();

export const BookingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookingScalarWhereWithAggregatesInputSchema),z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingScalarWhereWithAggregatesInputSchema),z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  backgroundWarna: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  peliharaan: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  harga: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  jadwal: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  durasi: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  jumlahOrang: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  katalogId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  kuponId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookinStatusWithAggregatesFilterSchema),z.lazy(() => BookinStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const PembayaranWhereInputSchema: z.ZodType<Prisma.PembayaranWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PembayaranWhereInputSchema),z.lazy(() => PembayaranWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PembayaranWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PembayaranWhereInputSchema),z.lazy(() => PembayaranWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  booking: z.union([ z.lazy(() => BookingRelationFilterSchema),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  dp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  jumlah: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PembayaranOrderByWithRelationInputSchema: z.ZodType<Prisma.PembayaranOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  booking: z.lazy(() => BookingOrderByWithRelationInputSchema).optional(),
  dp: z.lazy(() => SortOrderSchema).optional(),
  jumlah: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PembayaranWhereUniqueInputSchema: z.ZodType<Prisma.PembayaranWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const PembayaranOrderByWithAggregationInputSchema: z.ZodType<Prisma.PembayaranOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  dp: z.lazy(() => SortOrderSchema).optional(),
  jumlah: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PembayaranCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PembayaranAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PembayaranMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PembayaranMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PembayaranSumOrderByAggregateInputSchema).optional()
}).strict();

export const PembayaranScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PembayaranScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PembayaranScalarWhereWithAggregatesInputSchema),z.lazy(() => PembayaranScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PembayaranScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PembayaranScalarWhereWithAggregatesInputSchema),z.lazy(() => PembayaranScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bookingId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dp: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  jumlah: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FotoUserWhereInputSchema: z.ZodType<Prisma.FotoUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FotoUserWhereInputSchema),z.lazy(() => FotoUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FotoUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FotoUserWhereInputSchema),z.lazy(() => FotoUserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  booking: z.union([ z.lazy(() => BookingRelationFilterSchema),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FotoUserOrderByWithRelationInputSchema: z.ZodType<Prisma.FotoUserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  booking: z.lazy(() => BookingOrderByWithRelationInputSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FotoUserWhereUniqueInputSchema: z.ZodType<Prisma.FotoUserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FotoUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.FotoUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FotoUserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FotoUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FotoUserMinOrderByAggregateInputSchema).optional()
}).strict();

export const FotoUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FotoUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FotoUserScalarWhereWithAggregatesInputSchema),z.lazy(() => FotoUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FotoUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FotoUserScalarWhereWithAggregatesInputSchema),z.lazy(() => FotoUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bookingId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const KontenBlogWhereInputSchema: z.ZodType<Prisma.KontenBlogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KontenBlogWhereInputSchema),z.lazy(() => KontenBlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KontenBlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KontenBlogWhereInputSchema),z.lazy(() => KontenBlogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  judul: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment: z.lazy(() => CommentBlogListRelationFilterSchema).optional(),
  isi: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  posted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  like: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  gambarBlogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gambarBlog: z.union([ z.lazy(() => GambarBlogRelationFilterSchema),z.lazy(() => GambarBlogWhereInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const KontenBlogOrderByWithRelationInputSchema: z.ZodType<Prisma.KontenBlogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  judul: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => CommentBlogOrderByRelationAggregateInputSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  posted: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  gambarBlogId: z.lazy(() => SortOrderSchema).optional(),
  gambarBlog: z.lazy(() => GambarBlogOrderByWithRelationInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogWhereUniqueInputSchema: z.ZodType<Prisma.KontenBlogWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  gambarBlogId: z.string().optional()
}).strict();

export const KontenBlogOrderByWithAggregationInputSchema: z.ZodType<Prisma.KontenBlogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  judul: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  posted: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  gambarBlogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KontenBlogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KontenBlogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KontenBlogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KontenBlogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KontenBlogSumOrderByAggregateInputSchema).optional()
}).strict();

export const KontenBlogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KontenBlogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KontenBlogScalarWhereWithAggregatesInputSchema),z.lazy(() => KontenBlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KontenBlogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KontenBlogScalarWhereWithAggregatesInputSchema),z.lazy(() => KontenBlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  judul: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  posted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  like: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  gambarBlogId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GambarBlogWhereInputSchema: z.ZodType<Prisma.GambarBlogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GambarBlogWhereInputSchema),z.lazy(() => GambarBlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GambarBlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GambarBlogWhereInputSchema),z.lazy(() => GambarBlogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  KontenBlog: z.union([ z.lazy(() => KontenBlogRelationFilterSchema),z.lazy(() => KontenBlogWhereInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GambarBlogOrderByWithRelationInputSchema: z.ZodType<Prisma.GambarBlogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  KontenBlog: z.lazy(() => KontenBlogOrderByWithRelationInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GambarBlogWhereUniqueInputSchema: z.ZodType<Prisma.GambarBlogWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const GambarBlogOrderByWithAggregationInputSchema: z.ZodType<Prisma.GambarBlogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GambarBlogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GambarBlogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GambarBlogMinOrderByAggregateInputSchema).optional()
}).strict();

export const GambarBlogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GambarBlogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GambarBlogScalarWhereWithAggregatesInputSchema),z.lazy(() => GambarBlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GambarBlogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GambarBlogScalarWhereWithAggregatesInputSchema),z.lazy(() => GambarBlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentBlogWhereInputSchema: z.ZodType<Prisma.CommentBlogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentBlogWhereInputSchema),z.lazy(() => CommentBlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentBlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentBlogWhereInputSchema),z.lazy(() => CommentBlogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kontenBlogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kontenBlog: z.union([ z.lazy(() => KontenBlogRelationFilterSchema),z.lazy(() => KontenBlogWhereInputSchema) ]).optional(),
  nama: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  like: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dislike: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentBlogOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentBlogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kontenBlogId: z.lazy(() => SortOrderSchema).optional(),
  kontenBlog: z.lazy(() => KontenBlogOrderByWithRelationInputSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogWhereUniqueInputSchema: z.ZodType<Prisma.CommentBlogWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const CommentBlogOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentBlogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kontenBlogId: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentBlogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CommentBlogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentBlogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentBlogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CommentBlogSumOrderByAggregateInputSchema).optional()
}).strict();

export const CommentBlogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentBlogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentBlogScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentBlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentBlogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentBlogScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentBlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  kontenBlogId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  like: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  dislike: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BlastMarketingWhereInputSchema: z.ZodType<Prisma.BlastMarketingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlastMarketingWhereInputSchema),z.lazy(() => BlastMarketingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlastMarketingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlastMarketingWhereInputSchema),z.lazy(() => BlastMarketingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subjek: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  penerima: z.lazy(() => UserListRelationFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BlastMarketingOrderByWithRelationInputSchema: z.ZodType<Prisma.BlastMarketingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subjek: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  penerima: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlastMarketingWhereUniqueInputSchema: z.ZodType<Prisma.BlastMarketingWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const BlastMarketingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlastMarketingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subjek: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BlastMarketingCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlastMarketingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlastMarketingMinOrderByAggregateInputSchema).optional()
}).strict();

export const BlastMarketingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlastMarketingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BlastMarketingScalarWhereWithAggregatesInputSchema),z.lazy(() => BlastMarketingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlastMarketingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlastMarketingScalarWhereWithAggregatesInputSchema),z.lazy(() => BlastMarketingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subjek: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const HomeWhereInputSchema: z.ZodType<Prisma.HomeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HomeWhereInputSchema),z.lazy(() => HomeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HomeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HomeWhereInputSchema),z.lazy(() => HomeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  carousel: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const HomeOrderByWithRelationInputSchema: z.ZodType<Prisma.HomeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  carousel: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HomeWhereUniqueInputSchema: z.ZodType<Prisma.HomeWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const HomeOrderByWithAggregationInputSchema: z.ZodType<Prisma.HomeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  carousel: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HomeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HomeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HomeMinOrderByAggregateInputSchema).optional()
}).strict();

export const HomeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HomeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HomeScalarWhereWithAggregatesInputSchema),z.lazy(() => HomeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HomeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HomeScalarWhereWithAggregatesInputSchema),z.lazy(() => HomeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  carousel: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatRoomWhereInputSchema: z.ZodType<Prisma.ChatRoomWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatRoomWhereInputSchema),z.lazy(() => ChatRoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatRoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatRoomWhereInputSchema),z.lazy(() => ChatRoomWhereInputSchema).array() ]).optional(),
  Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  admin: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Chat: z.lazy(() => ChatListRelationFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatRoomOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatRoomOrderByWithRelationInput> = z.object({
  Id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Chat: z.lazy(() => ChatOrderByRelationAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatRoomWhereUniqueInputSchema: z.ZodType<Prisma.ChatRoomWhereUniqueInput> = z.object({
  Id: z.string().cuid().optional()
}).strict();

export const ChatRoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatRoomOrderByWithAggregationInput> = z.object({
  Id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatRoomCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatRoomMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatRoomMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChatRoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatRoomScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatRoomScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatRoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatRoomScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatRoomScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatRoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  Id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatWhereInputSchema: z.ZodType<Prisma.ChatWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatWhereInputSchema),z.lazy(() => ChatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatWhereInputSchema),z.lazy(() => ChatWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chatRoomId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chatRoom: z.union([ z.lazy(() => ChatRoomRelationFilterSchema),z.lazy(() => ChatRoomWhereInputSchema) ]).optional(),
  chat: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminSend: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  chatRoomId: z.lazy(() => SortOrderSchema).optional(),
  chatRoom: z.lazy(() => ChatRoomOrderByWithRelationInputSchema).optional(),
  chat: z.lazy(() => SortOrderSchema).optional(),
  adminSend: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatWhereUniqueInputSchema: z.ZodType<Prisma.ChatWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ChatOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  chatRoomId: z.lazy(() => SortOrderSchema).optional(),
  chat: z.lazy(() => SortOrderSchema).optional(),
  adminSend: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChatScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  chatRoomId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  chat: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  adminSend: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FeedbackWhereInputSchema: z.ZodType<Prisma.FeedbackWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  isiFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  namaPenulis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerListRelationFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FeedbackOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  isiFeedback: z.lazy(() => SortOrderSchema).optional(),
  namaPenulis: z.lazy(() => SortOrderSchema).optional(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerOrderByRelationAggregateInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FeedbackOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  isiFeedback: z.lazy(() => SortOrderSchema).optional(),
  namaPenulis: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeedbackCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackMinOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isiFeedback: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  namaPenulis: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FeedbackAnswerWhereInputSchema: z.ZodType<Prisma.FeedbackAnswerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackAnswerWhereInputSchema),z.lazy(() => FeedbackAnswerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackAnswerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackAnswerWhereInputSchema),z.lazy(() => FeedbackAnswerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedback: z.union([ z.lazy(() => FeedbackRelationFilterSchema),z.lazy(() => FeedbackWhereInputSchema) ]).optional(),
  feedbackQuestionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => FeedbackQuestionRelationFilterSchema),z.lazy(() => FeedbackQuestionWhereInputSchema) ]).optional(),
  answer: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FeedbackAnswerOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackAnswerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  feedback: z.lazy(() => FeedbackOrderByWithRelationInputSchema).optional(),
  feedbackQuestionId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => FeedbackQuestionOrderByWithRelationInputSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAnswerWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackAnswerWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FeedbackAnswerOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackAnswerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  feedbackQuestionId: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeedbackAnswerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackAnswerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackAnswerMinOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackAnswerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackAnswerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackAnswerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  feedbackQuestionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FeedbackQuestionWhereInputSchema: z.ZodType<Prisma.FeedbackQuestionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackQuestionWhereInputSchema),z.lazy(() => FeedbackQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackQuestionWhereInputSchema),z.lazy(() => FeedbackQuestionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pertanyaan: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  FeedbackAnswer: z.lazy(() => FeedbackAnswerListRelationFilterSchema).optional()
}).strict();

export const FeedbackQuestionOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackQuestionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pertanyaan: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  FeedbackAnswer: z.lazy(() => FeedbackAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FeedbackQuestionWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackQuestionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FeedbackQuestionOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackQuestionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pertanyaan: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeedbackQuestionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackQuestionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackQuestionMinOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackQuestionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackQuestionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackQuestionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pertanyaan: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ContohWhereInputSchema: z.ZodType<Prisma.ContohWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContohWhereInputSchema),z.lazy(() => ContohWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContohWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContohWhereInputSchema),z.lazy(() => ContohWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ContohOrderByWithRelationInputSchema: z.ZodType<Prisma.ContohOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohWhereUniqueInputSchema: z.ZodType<Prisma.ContohWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ContohOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContohOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContohCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContohMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContohMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContohScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContohScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContohScalarWhereWithAggregatesInputSchema),z.lazy(() => ContohScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContohScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContohScalarWhereWithAggregatesInputSchema),z.lazy(() => ContohScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ContohImageWhereInputSchema: z.ZodType<Prisma.ContohImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContohImageWhereInputSchema),z.lazy(() => ContohImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContohImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContohImageWhereInputSchema),z.lazy(() => ContohImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ContohImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ContohImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ContohImageWhereUniqueInputSchema: z.ZodType<Prisma.ContohImageWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ContohImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContohImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContohImageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContohImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContohImageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContohImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContohImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContohImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ContohImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContohImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContohImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ContohImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KatalogCreateInputSchema: z.ZodType<Prisma.KatalogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  durasi: z.number().int(),
  harga: z.number().int(),
  jumlahOrang: z.number().int().optional().nullable(),
  deskripsi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Booking: z.lazy(() => BookingCreateNestedManyWithoutKatalogInputSchema).optional(),
  deleted: z.boolean().optional()
}).strict();

export const KatalogUncheckedCreateInputSchema: z.ZodType<Prisma.KatalogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  durasi: z.number().int(),
  harga: z.number().int(),
  jumlahOrang: z.number().int().optional().nullable(),
  deskripsi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutKatalogInputSchema).optional(),
  deleted: z.boolean().optional()
}).strict();

export const KatalogUpdateInputSchema: z.ZodType<Prisma.KatalogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deskripsi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Booking: z.lazy(() => BookingUpdateManyWithoutKatalogNestedInputSchema).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KatalogUncheckedUpdateInputSchema: z.ZodType<Prisma.KatalogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deskripsi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Booking: z.lazy(() => BookingUncheckedUpdateManyWithoutKatalogNestedInputSchema).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KatalogCreateManyInputSchema: z.ZodType<Prisma.KatalogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  durasi: z.number().int(),
  harga: z.number().int(),
  jumlahOrang: z.number().int().optional().nullable(),
  deskripsi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const KatalogUpdateManyMutationInputSchema: z.ZodType<Prisma.KatalogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deskripsi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KatalogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KatalogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deskripsi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KuponCreateInputSchema: z.ZodType<Prisma.KuponCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  kode: z.string(),
  diskon: z.number(),
  kuotaPemakaian: z.number().int().optional(),
  kuotaTerpakai: z.number().int().optional(),
  active: z.boolean().optional(),
  tanggal: z.coerce.date(),
  Booking: z.lazy(() => BookingCreateNestedManyWithoutKuponInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KuponUncheckedCreateInputSchema: z.ZodType<Prisma.KuponUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  kode: z.string(),
  diskon: z.number(),
  kuotaPemakaian: z.number().int().optional(),
  kuotaTerpakai: z.number().int().optional(),
  active: z.boolean().optional(),
  tanggal: z.coerce.date(),
  Booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutKuponInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KuponUpdateInputSchema: z.ZodType<Prisma.KuponUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diskon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaPemakaian: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaTerpakai: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tanggal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Booking: z.lazy(() => BookingUpdateManyWithoutKuponNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KuponUncheckedUpdateInputSchema: z.ZodType<Prisma.KuponUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diskon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaPemakaian: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaTerpakai: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tanggal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Booking: z.lazy(() => BookingUncheckedUpdateManyWithoutKuponNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KuponCreateManyInputSchema: z.ZodType<Prisma.KuponCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  kode: z.string(),
  diskon: z.number(),
  kuotaPemakaian: z.number().int().optional(),
  kuotaTerpakai: z.number().int().optional(),
  active: z.boolean().optional(),
  tanggal: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KuponUpdateManyMutationInputSchema: z.ZodType<Prisma.KuponUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diskon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaPemakaian: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaTerpakai: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tanggal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KuponUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KuponUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diskon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaPemakaian: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaTerpakai: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tanggal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BackgroundFotoCreateInputSchema: z.ZodType<Prisma.BackgroundFotoCreateInput> = z.object({
  warna: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Booking: z.lazy(() => BookingCreateNestedManyWithoutBackgroundInputSchema).optional(),
  deleted: z.boolean().optional()
}).strict();

export const BackgroundFotoUncheckedCreateInputSchema: z.ZodType<Prisma.BackgroundFotoUncheckedCreateInput> = z.object({
  warna: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutBackgroundInputSchema).optional(),
  deleted: z.boolean().optional()
}).strict();

export const BackgroundFotoUpdateInputSchema: z.ZodType<Prisma.BackgroundFotoUpdateInput> = z.object({
  warna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Booking: z.lazy(() => BookingUpdateManyWithoutBackgroundNestedInputSchema).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BackgroundFotoUncheckedUpdateInputSchema: z.ZodType<Prisma.BackgroundFotoUncheckedUpdateInput> = z.object({
  warna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Booking: z.lazy(() => BookingUncheckedUpdateManyWithoutBackgroundNestedInputSchema).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BackgroundFotoCreateManyInputSchema: z.ZodType<Prisma.BackgroundFotoCreateManyInput> = z.object({
  warna: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BackgroundFotoUpdateManyMutationInputSchema: z.ZodType<Prisma.BackgroundFotoUpdateManyMutationInput> = z.object({
  warna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BackgroundFotoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BackgroundFotoUncheckedUpdateManyInput> = z.object({
  warna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateInputSchema: z.ZodType<Prisma.BookingCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookingInputSchema),
  background: z.lazy(() => BackgroundFotoCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalog: z.lazy(() => KatalogCreateNestedOneWithoutBookingInputSchema),
  kupon: z.lazy(() => KuponCreateNestedOneWithoutBookingInputSchema).optional(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateInputSchema: z.ZodType<Prisma.BookingUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUpdateInputSchema: z.ZodType<Prisma.BookingUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  background: z.lazy(() => BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalog: z.lazy(() => KatalogUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  kupon: z.lazy(() => KuponUpdateOneWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateManyInputSchema: z.ZodType<Prisma.BookingCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUpdateManyMutationInputSchema: z.ZodType<Prisma.BookingUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranCreateInputSchema: z.ZodType<Prisma.PembayaranCreateInput> = z.object({
  id: z.string().cuid().optional(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutPembayaranInputSchema),
  dp: z.boolean(),
  jumlah: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PembayaranUncheckedCreateInputSchema: z.ZodType<Prisma.PembayaranUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookingId: z.string(),
  dp: z.boolean(),
  jumlah: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PembayaranUpdateInputSchema: z.ZodType<Prisma.PembayaranUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneRequiredWithoutPembayaranNestedInputSchema).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranUncheckedUpdateInputSchema: z.ZodType<Prisma.PembayaranUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranCreateManyInputSchema: z.ZodType<Prisma.PembayaranCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookingId: z.string(),
  dp: z.boolean(),
  jumlah: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PembayaranUpdateManyMutationInputSchema: z.ZodType<Prisma.PembayaranUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PembayaranUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserCreateInputSchema: z.ZodType<Prisma.FotoUserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutFotoUserInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutFotoUserInputSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserUncheckedCreateInputSchema: z.ZodType<Prisma.FotoUserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookingId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserUpdateInputSchema: z.ZodType<Prisma.FotoUserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneRequiredWithoutFotoUserNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFotoUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserCreateManyInputSchema: z.ZodType<Prisma.FotoUserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookingId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserUpdateManyMutationInputSchema: z.ZodType<Prisma.FotoUserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogCreateInputSchema: z.ZodType<Prisma.KontenBlogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  judul: z.string(),
  comment: z.lazy(() => CommentBlogCreateNestedManyWithoutKontenBlogInputSchema).optional(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number().int(),
  gambarBlog: z.lazy(() => GambarBlogCreateNestedOneWithoutKontenBlogInputSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogUncheckedCreateInputSchema: z.ZodType<Prisma.KontenBlogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  judul: z.string(),
  comment: z.lazy(() => CommentBlogUncheckedCreateNestedManyWithoutKontenBlogInputSchema).optional(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number().int(),
  gambarBlogId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogUpdateInputSchema: z.ZodType<Prisma.KontenBlogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentBlogUpdateManyWithoutKontenBlogNestedInputSchema).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gambarBlog: z.lazy(() => GambarBlogUpdateOneRequiredWithoutKontenBlogNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogUncheckedUpdateInputSchema: z.ZodType<Prisma.KontenBlogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentBlogUncheckedUpdateManyWithoutKontenBlogNestedInputSchema).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gambarBlogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogCreateManyInputSchema: z.ZodType<Prisma.KontenBlogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  judul: z.string(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number().int(),
  gambarBlogId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogUpdateManyMutationInputSchema: z.ZodType<Prisma.KontenBlogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KontenBlogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gambarBlogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GambarBlogCreateInputSchema: z.ZodType<Prisma.GambarBlogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  KontenBlog: z.lazy(() => KontenBlogCreateNestedOneWithoutGambarBlogInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GambarBlogUncheckedCreateInputSchema: z.ZodType<Prisma.GambarBlogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  KontenBlog: z.lazy(() => KontenBlogUncheckedCreateNestedOneWithoutGambarBlogInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GambarBlogUpdateInputSchema: z.ZodType<Prisma.GambarBlogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  KontenBlog: z.lazy(() => KontenBlogUpdateOneWithoutGambarBlogNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GambarBlogUncheckedUpdateInputSchema: z.ZodType<Prisma.GambarBlogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  KontenBlog: z.lazy(() => KontenBlogUncheckedUpdateOneWithoutGambarBlogNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GambarBlogCreateManyInputSchema: z.ZodType<Prisma.GambarBlogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GambarBlogUpdateManyMutationInputSchema: z.ZodType<Prisma.GambarBlogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GambarBlogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GambarBlogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogCreateInputSchema: z.ZodType<Prisma.CommentBlogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  kontenBlog: z.lazy(() => KontenBlogCreateNestedOneWithoutCommentInputSchema),
  nama: z.string(),
  isi: z.string(),
  like: z.number().int(),
  dislike: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CommentBlogUncheckedCreateInputSchema: z.ZodType<Prisma.CommentBlogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  kontenBlogId: z.string(),
  nama: z.string(),
  isi: z.string(),
  like: z.number().int(),
  dislike: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CommentBlogUpdateInputSchema: z.ZodType<Prisma.CommentBlogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kontenBlog: z.lazy(() => KontenBlogUpdateOneRequiredWithoutCommentNestedInputSchema).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentBlogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kontenBlogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogCreateManyInputSchema: z.ZodType<Prisma.CommentBlogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  kontenBlogId: z.string(),
  nama: z.string(),
  isi: z.string(),
  like: z.number().int(),
  dislike: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CommentBlogUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentBlogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentBlogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kontenBlogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingCreateInputSchema: z.ZodType<Prisma.BlastMarketingCreateInput> = z.object({
  id: z.string().cuid().optional(),
  subjek: z.string(),
  isi: z.string(),
  penerima: z.lazy(() => UserCreateNestedManyWithoutBlastMarketingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BlastMarketingUncheckedCreateInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  subjek: z.string(),
  isi: z.string(),
  penerima: z.lazy(() => UserUncheckedCreateNestedManyWithoutBlastMarketingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BlastMarketingUpdateInputSchema: z.ZodType<Prisma.BlastMarketingUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  penerima: z.lazy(() => UserUpdateManyWithoutBlastMarketingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingUncheckedUpdateInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  penerima: z.lazy(() => UserUncheckedUpdateManyWithoutBlastMarketingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingCreateManyInputSchema: z.ZodType<Prisma.BlastMarketingCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  subjek: z.string(),
  isi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BlastMarketingUpdateManyMutationInputSchema: z.ZodType<Prisma.BlastMarketingUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HomeCreateInputSchema: z.ZodType<Prisma.HomeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  image: z.string(),
  carousel: z.union([ z.lazy(() => HomeCreatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HomeUncheckedCreateInputSchema: z.ZodType<Prisma.HomeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  image: z.string(),
  carousel: z.union([ z.lazy(() => HomeCreatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HomeUpdateInputSchema: z.ZodType<Prisma.HomeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  carousel: z.union([ z.lazy(() => HomeUpdatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HomeUncheckedUpdateInputSchema: z.ZodType<Prisma.HomeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  carousel: z.union([ z.lazy(() => HomeUpdatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HomeCreateManyInputSchema: z.ZodType<Prisma.HomeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  image: z.string(),
  carousel: z.union([ z.lazy(() => HomeCreatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HomeUpdateManyMutationInputSchema: z.ZodType<Prisma.HomeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  carousel: z.union([ z.lazy(() => HomeUpdatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HomeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HomeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  carousel: z.union([ z.lazy(() => HomeUpdatecarouselInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomCreateInputSchema: z.ZodType<Prisma.ChatRoomCreateInput> = z.object({
  Id: z.string().cuid().optional(),
  admin: z.lazy(() => UserCreateNestedOneWithoutChatRoomAdminInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutChatRoomUserInputSchema).optional(),
  Chat: z.lazy(() => ChatCreateNestedManyWithoutChatRoomInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomUncheckedCreateInputSchema: z.ZodType<Prisma.ChatRoomUncheckedCreateInput> = z.object({
  Id: z.string().cuid().optional(),
  adminId: z.string(),
  userId: z.string().optional().nullable(),
  Chat: z.lazy(() => ChatUncheckedCreateNestedManyWithoutChatRoomInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomUpdateInputSchema: z.ZodType<Prisma.ChatRoomUpdateInput> = z.object({
  Id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => UserUpdateOneRequiredWithoutChatRoomAdminNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutChatRoomUserNestedInputSchema).optional(),
  Chat: z.lazy(() => ChatUpdateManyWithoutChatRoomNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateInput> = z.object({
  Id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Chat: z.lazy(() => ChatUncheckedUpdateManyWithoutChatRoomNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomCreateManyInputSchema: z.ZodType<Prisma.ChatRoomCreateManyInput> = z.object({
  Id: z.string().cuid().optional(),
  adminId: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatRoomUpdateManyMutationInput> = z.object({
  Id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateManyInput> = z.object({
  Id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatCreateInputSchema: z.ZodType<Prisma.ChatCreateInput> = z.object({
  id: z.string().cuid().optional(),
  chatRoom: z.lazy(() => ChatRoomCreateNestedOneWithoutChatInputSchema),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatUncheckedCreateInputSchema: z.ZodType<Prisma.ChatUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  chatRoomId: z.string(),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatUpdateInputSchema: z.ZodType<Prisma.ChatUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chatRoom: z.lazy(() => ChatRoomUpdateOneRequiredWithoutChatNestedInputSchema).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chatRoomId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatCreateManyInputSchema: z.ZodType<Prisma.ChatCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  chatRoomId: z.string(),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chatRoomId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCreateInputSchema: z.ZodType<Prisma.FeedbackCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackInputSchema),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerCreateNestedManyWithoutFeedbackInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUpdateInputSchema: z.ZodType<Prisma.FeedbackUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerUpdateManyWithoutFeedbackNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCreateManyInputSchema: z.ZodType<Prisma.FeedbackCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackAnswerCreateInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateInput> = z.object({
  id: z.string().cuid().optional(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutFeedbackAnswerInputSchema),
  question: z.lazy(() => FeedbackQuestionCreateNestedOneWithoutFeedbackAnswerInputSchema),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  feedbackQuestionId: z.string(),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUpdateInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateOneRequiredWithoutFeedbackAnswerNestedInputSchema).optional(),
  question: z.lazy(() => FeedbackQuestionUpdateOneRequiredWithoutFeedbackAnswerNestedInputSchema).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackQuestionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerCreateManyInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  feedbackQuestionId: z.string(),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackQuestionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackQuestionCreateInputSchema: z.ZodType<Prisma.FeedbackQuestionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  pertanyaan: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  FeedbackAnswer: z.lazy(() => FeedbackAnswerCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const FeedbackQuestionUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackQuestionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  pertanyaan: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  FeedbackAnswer: z.lazy(() => FeedbackAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const FeedbackQuestionUpdateInputSchema: z.ZodType<Prisma.FeedbackQuestionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pertanyaan: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  FeedbackAnswer: z.lazy(() => FeedbackAnswerUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const FeedbackQuestionUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackQuestionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pertanyaan: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  FeedbackAnswer: z.lazy(() => FeedbackAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const FeedbackQuestionCreateManyInputSchema: z.ZodType<Prisma.FeedbackQuestionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  pertanyaan: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackQuestionUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackQuestionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pertanyaan: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackQuestionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackQuestionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pertanyaan: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohCreateInputSchema: z.ZodType<Prisma.ContohCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string()
}).strict();

export const ContohUncheckedCreateInputSchema: z.ZodType<Prisma.ContohUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string()
}).strict();

export const ContohUpdateInputSchema: z.ZodType<Prisma.ContohUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohUncheckedUpdateInputSchema: z.ZodType<Prisma.ContohUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohCreateManyInputSchema: z.ZodType<Prisma.ContohCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string()
}).strict();

export const ContohUpdateManyMutationInputSchema: z.ZodType<Prisma.ContohUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContohUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohImageCreateInputSchema: z.ZodType<Prisma.ContohImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutContohImageInputSchema)
}).strict();

export const ContohImageUncheckedCreateInputSchema: z.ZodType<Prisma.ContohImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string()
}).strict();

export const ContohImageUpdateInputSchema: z.ZodType<Prisma.ContohImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutContohImageNestedInputSchema).optional()
}).strict();

export const ContohImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ContohImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohImageCreateManyInputSchema: z.ZodType<Prisma.ContohImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string()
}).strict();

export const ContohImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ContohImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContohImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const BookingListRelationFilterSchema: z.ZodType<Prisma.BookingListRelationFilter> = z.object({
  every: z.lazy(() => BookingWhereInputSchema).optional(),
  some: z.lazy(() => BookingWhereInputSchema).optional(),
  none: z.lazy(() => BookingWhereInputSchema).optional()
}).strict();

export const BlastMarketingListRelationFilterSchema: z.ZodType<Prisma.BlastMarketingListRelationFilter> = z.object({
  every: z.lazy(() => BlastMarketingWhereInputSchema).optional(),
  some: z.lazy(() => BlastMarketingWhereInputSchema).optional(),
  none: z.lazy(() => BlastMarketingWhereInputSchema).optional()
}).strict();

export const ChatRoomListRelationFilterSchema: z.ZodType<Prisma.ChatRoomListRelationFilter> = z.object({
  every: z.lazy(() => ChatRoomWhereInputSchema).optional(),
  some: z.lazy(() => ChatRoomWhereInputSchema).optional(),
  none: z.lazy(() => ChatRoomWhereInputSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ContohImageListRelationFilterSchema: z.ZodType<Prisma.ContohImageListRelationFilter> = z.object({
  every: z.lazy(() => ContohImageWhereInputSchema).optional(),
  some: z.lazy(() => ContohImageWhereInputSchema).optional(),
  none: z.lazy(() => ContohImageWhereInputSchema).optional()
}).strict();

export const FeedbackListRelationFilterSchema: z.ZodType<Prisma.FeedbackListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const FotoUserListRelationFilterSchema: z.ZodType<Prisma.FotoUserListRelationFilter> = z.object({
  every: z.lazy(() => FotoUserWhereInputSchema).optional(),
  some: z.lazy(() => FotoUserWhereInputSchema).optional(),
  none: z.lazy(() => FotoUserWhereInputSchema).optional()
}).strict();

export const BookingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BookingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlastMarketingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlastMarketingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatRoomOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatRoomOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContohImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FotoUserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FotoUserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  instagram: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const KatalogCountOrderByAggregateInputSchema: z.ZodType<Prisma.KatalogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  deskripsi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KatalogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KatalogAvgOrderByAggregateInput> = z.object({
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KatalogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KatalogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  deskripsi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KatalogMinOrderByAggregateInputSchema: z.ZodType<Prisma.KatalogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  deskripsi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KatalogSumOrderByAggregateInputSchema: z.ZodType<Prisma.KatalogSumOrderByAggregateInput> = z.object({
  durasi: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const KuponCountOrderByAggregateInputSchema: z.ZodType<Prisma.KuponCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  kode: z.lazy(() => SortOrderSchema).optional(),
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  tanggal: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KuponAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KuponAvgOrderByAggregateInput> = z.object({
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KuponMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KuponMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  kode: z.lazy(() => SortOrderSchema).optional(),
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  tanggal: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KuponMinOrderByAggregateInputSchema: z.ZodType<Prisma.KuponMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  kode: z.lazy(() => SortOrderSchema).optional(),
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  tanggal: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KuponSumOrderByAggregateInputSchema: z.ZodType<Prisma.KuponSumOrderByAggregateInput> = z.object({
  diskon: z.lazy(() => SortOrderSchema).optional(),
  kuotaPemakaian: z.lazy(() => SortOrderSchema).optional(),
  kuotaTerpakai: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BackgroundFotoCountOrderByAggregateInputSchema: z.ZodType<Prisma.BackgroundFotoCountOrderByAggregateInput> = z.object({
  warna: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BackgroundFotoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BackgroundFotoMaxOrderByAggregateInput> = z.object({
  warna: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BackgroundFotoMinOrderByAggregateInputSchema: z.ZodType<Prisma.BackgroundFotoMinOrderByAggregateInput> = z.object({
  warna: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const BackgroundFotoRelationFilterSchema: z.ZodType<Prisma.BackgroundFotoRelationFilter> = z.object({
  is: z.lazy(() => BackgroundFotoWhereInputSchema).optional(),
  isNot: z.lazy(() => BackgroundFotoWhereInputSchema).optional()
}).strict();

export const KatalogRelationFilterSchema: z.ZodType<Prisma.KatalogRelationFilter> = z.object({
  is: z.lazy(() => KatalogWhereInputSchema).optional(),
  isNot: z.lazy(() => KatalogWhereInputSchema).optional()
}).strict();

export const KuponRelationFilterSchema: z.ZodType<Prisma.KuponRelationFilter> = z.object({
  is: z.lazy(() => KuponWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => KuponWhereInputSchema).optional().nullable()
}).strict();

export const EnumBookinStatusFilterSchema: z.ZodType<Prisma.EnumBookinStatusFilter> = z.object({
  equals: z.lazy(() => BookinStatusSchema).optional(),
  in: z.lazy(() => BookinStatusSchema).array().optional(),
  notIn: z.lazy(() => BookinStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => NestedEnumBookinStatusFilterSchema) ]).optional(),
}).strict();

export const PembayaranListRelationFilterSchema: z.ZodType<Prisma.PembayaranListRelationFilter> = z.object({
  every: z.lazy(() => PembayaranWhereInputSchema).optional(),
  some: z.lazy(() => PembayaranWhereInputSchema).optional(),
  none: z.lazy(() => PembayaranWhereInputSchema).optional()
}).strict();

export const PembayaranOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PembayaranOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BookingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  backgroundWarna: z.lazy(() => SortOrderSchema).optional(),
  peliharaan: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jadwal: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  katalogId: z.lazy(() => SortOrderSchema).optional(),
  kuponId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BookingAvgOrderByAggregateInput> = z.object({
  harga: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BookingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  backgroundWarna: z.lazy(() => SortOrderSchema).optional(),
  peliharaan: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jadwal: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  katalogId: z.lazy(() => SortOrderSchema).optional(),
  kuponId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BookingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  backgroundWarna: z.lazy(() => SortOrderSchema).optional(),
  peliharaan: z.lazy(() => SortOrderSchema).optional(),
  harga: z.lazy(() => SortOrderSchema).optional(),
  jadwal: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional(),
  katalogId: z.lazy(() => SortOrderSchema).optional(),
  kuponId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingSumOrderByAggregateInputSchema: z.ZodType<Prisma.BookingSumOrderByAggregateInput> = z.object({
  harga: z.lazy(() => SortOrderSchema).optional(),
  durasi: z.lazy(() => SortOrderSchema).optional(),
  jumlahOrang: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBookinStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBookinStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookinStatusSchema).optional(),
  in: z.lazy(() => BookinStatusSchema).array().optional(),
  notIn: z.lazy(() => BookinStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => NestedEnumBookinStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookinStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookinStatusFilterSchema).optional()
}).strict();

export const BookingRelationFilterSchema: z.ZodType<Prisma.BookingRelationFilter> = z.object({
  is: z.lazy(() => BookingWhereInputSchema).optional(),
  isNot: z.lazy(() => BookingWhereInputSchema).optional()
}).strict();

export const PembayaranCountOrderByAggregateInputSchema: z.ZodType<Prisma.PembayaranCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  dp: z.lazy(() => SortOrderSchema).optional(),
  jumlah: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PembayaranAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PembayaranAvgOrderByAggregateInput> = z.object({
  jumlah: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PembayaranMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PembayaranMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  dp: z.lazy(() => SortOrderSchema).optional(),
  jumlah: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PembayaranMinOrderByAggregateInputSchema: z.ZodType<Prisma.PembayaranMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  dp: z.lazy(() => SortOrderSchema).optional(),
  jumlah: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PembayaranSumOrderByAggregateInputSchema: z.ZodType<Prisma.PembayaranSumOrderByAggregateInput> = z.object({
  jumlah: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FotoUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.FotoUserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FotoUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FotoUserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FotoUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.FotoUserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookingId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogListRelationFilterSchema: z.ZodType<Prisma.CommentBlogListRelationFilter> = z.object({
  every: z.lazy(() => CommentBlogWhereInputSchema).optional(),
  some: z.lazy(() => CommentBlogWhereInputSchema).optional(),
  none: z.lazy(() => CommentBlogWhereInputSchema).optional()
}).strict();

export const GambarBlogRelationFilterSchema: z.ZodType<Prisma.GambarBlogRelationFilter> = z.object({
  is: z.lazy(() => GambarBlogWhereInputSchema).optional(),
  isNot: z.lazy(() => GambarBlogWhereInputSchema).optional()
}).strict();

export const CommentBlogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentBlogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogCountOrderByAggregateInputSchema: z.ZodType<Prisma.KontenBlogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  judul: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  posted: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  gambarBlogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KontenBlogAvgOrderByAggregateInput> = z.object({
  like: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KontenBlogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  judul: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  posted: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  gambarBlogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogMinOrderByAggregateInputSchema: z.ZodType<Prisma.KontenBlogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  judul: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  posted: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  gambarBlogId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogSumOrderByAggregateInputSchema: z.ZodType<Prisma.KontenBlogSumOrderByAggregateInput> = z.object({
  like: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KontenBlogRelationFilterSchema: z.ZodType<Prisma.KontenBlogRelationFilter> = z.object({
  is: z.lazy(() => KontenBlogWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => KontenBlogWhereInputSchema).optional().nullable()
}).strict();

export const GambarBlogCountOrderByAggregateInputSchema: z.ZodType<Prisma.GambarBlogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GambarBlogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GambarBlogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GambarBlogMinOrderByAggregateInputSchema: z.ZodType<Prisma.GambarBlogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentBlogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kontenBlogId: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CommentBlogAvgOrderByAggregateInput> = z.object({
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentBlogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kontenBlogId: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentBlogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kontenBlogId: z.lazy(() => SortOrderSchema).optional(),
  nama: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentBlogSumOrderByAggregateInputSchema: z.ZodType<Prisma.CommentBlogSumOrderByAggregateInput> = z.object({
  like: z.lazy(() => SortOrderSchema).optional(),
  dislike: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlastMarketingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlastMarketingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subjek: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlastMarketingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlastMarketingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subjek: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlastMarketingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlastMarketingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subjek: z.lazy(() => SortOrderSchema).optional(),
  isi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const HomeCountOrderByAggregateInputSchema: z.ZodType<Prisma.HomeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  carousel: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HomeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HomeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HomeMinOrderByAggregateInputSchema: z.ZodType<Prisma.HomeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatListRelationFilterSchema: z.ZodType<Prisma.ChatListRelationFilter> = z.object({
  every: z.lazy(() => ChatWhereInputSchema).optional(),
  some: z.lazy(() => ChatWhereInputSchema).optional(),
  none: z.lazy(() => ChatWhereInputSchema).optional()
}).strict();

export const ChatOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatRoomCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatRoomCountOrderByAggregateInput> = z.object({
  Id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatRoomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatRoomMaxOrderByAggregateInput> = z.object({
  Id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatRoomMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatRoomMinOrderByAggregateInput> = z.object({
  Id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatRoomRelationFilterSchema: z.ZodType<Prisma.ChatRoomRelationFilter> = z.object({
  is: z.lazy(() => ChatRoomWhereInputSchema).optional(),
  isNot: z.lazy(() => ChatRoomWhereInputSchema).optional()
}).strict();

export const ChatCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  chatRoomId: z.lazy(() => SortOrderSchema).optional(),
  chat: z.lazy(() => SortOrderSchema).optional(),
  adminSend: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  chatRoomId: z.lazy(() => SortOrderSchema).optional(),
  chat: z.lazy(() => SortOrderSchema).optional(),
  adminSend: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  chatRoomId: z.lazy(() => SortOrderSchema).optional(),
  chat: z.lazy(() => SortOrderSchema).optional(),
  adminSend: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAnswerListRelationFilterSchema: z.ZodType<Prisma.FeedbackAnswerListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackAnswerWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackAnswerWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackAnswerWhereInputSchema).optional()
}).strict();

export const FeedbackAnswerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackAnswerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  isiFeedback: z.lazy(() => SortOrderSchema).optional(),
  namaPenulis: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  isiFeedback: z.lazy(() => SortOrderSchema).optional(),
  namaPenulis: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  isiFeedback: z.lazy(() => SortOrderSchema).optional(),
  namaPenulis: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackRelationFilterSchema: z.ZodType<Prisma.FeedbackRelationFilter> = z.object({
  is: z.lazy(() => FeedbackWhereInputSchema).optional(),
  isNot: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const FeedbackQuestionRelationFilterSchema: z.ZodType<Prisma.FeedbackQuestionRelationFilter> = z.object({
  is: z.lazy(() => FeedbackQuestionWhereInputSchema).optional(),
  isNot: z.lazy(() => FeedbackQuestionWhereInputSchema).optional()
}).strict();

export const FeedbackAnswerCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackAnswerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  feedbackQuestionId: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAnswerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackAnswerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  feedbackQuestionId: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAnswerMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackAnswerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedbackId: z.lazy(() => SortOrderSchema).optional(),
  feedbackQuestionId: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackQuestionCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackQuestionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pertanyaan: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackQuestionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackQuestionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pertanyaan: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackQuestionMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackQuestionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pertanyaan: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContohCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContohMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContohMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContohImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContohImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContohImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContohImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BookingCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutUserInputSchema),z.lazy(() => BookingCreateWithoutUserInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlastMarketingCreateNestedManyWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingCreateNestedManyWithoutPenerimaInput> = z.object({
  create: z.union([ z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema).array(),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateWithoutAdminInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutUserInputSchema),z.lazy(() => ChatRoomCreateWithoutUserInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContohImageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ContohImageCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ContohImageCreateWithoutUserInputSchema),z.lazy(() => ContohImageCreateWithoutUserInputSchema).array(),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContohImageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FotoUserCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FotoUserCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutUserInputSchema),z.lazy(() => FotoUserCreateWithoutUserInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BookingUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutUserInputSchema),z.lazy(() => BookingCreateWithoutUserInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInput> = z.object({
  create: z.union([ z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema).array(),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateWithoutAdminInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutUserInputSchema),z.lazy(() => ChatRoomCreateWithoutUserInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContohImageUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ContohImageCreateWithoutUserInputSchema),z.lazy(() => ContohImageCreateWithoutUserInputSchema).array(),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContohImageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FotoUserUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutUserInputSchema),z.lazy(() => FotoUserCreateWithoutUserInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const BookingUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BookingUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutUserInputSchema),z.lazy(() => BookingCreateWithoutUserInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema: z.ZodType<Prisma.BlastMarketingUpdateManyWithoutPenerimaNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema).array(),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlastMarketingUpsertWithWhereUniqueWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUpsertWithWhereUniqueWithoutPenerimaInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlastMarketingUpdateWithWhereUniqueWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUpdateWithWhereUniqueWithoutPenerimaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlastMarketingUpdateManyWithWhereWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUpdateManyWithWhereWithoutPenerimaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlastMarketingScalarWhereInputSchema),z.lazy(() => BlastMarketingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ChatRoomUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateWithoutAdminInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatRoomUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ChatRoomUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatRoomScalarWhereInputSchema),z.lazy(() => ChatRoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatRoomUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutUserInputSchema),z.lazy(() => ChatRoomCreateWithoutUserInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatRoomUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatRoomUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatRoomScalarWhereInputSchema),z.lazy(() => ChatRoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ContohImageUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ContohImageUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContohImageCreateWithoutUserInputSchema),z.lazy(() => ContohImageCreateWithoutUserInputSchema).array(),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContohImageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContohImageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContohImageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContohImageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContohImageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContohImageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ContohImageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContohImageScalarWhereInputSchema),z.lazy(() => ContohImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FotoUserUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FotoUserUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutUserInputSchema),z.lazy(() => FotoUserCreateWithoutUserInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FotoUserUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FotoUserUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FotoUserScalarWhereInputSchema),z.lazy(() => FotoUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutUserInputSchema),z.lazy(() => BookingCreateWithoutUserInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => BookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema).array(),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingCreateOrConnectWithoutPenerimaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlastMarketingUpsertWithWhereUniqueWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUpsertWithWhereUniqueWithoutPenerimaInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlastMarketingWhereUniqueInputSchema),z.lazy(() => BlastMarketingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlastMarketingUpdateWithWhereUniqueWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUpdateWithWhereUniqueWithoutPenerimaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlastMarketingUpdateManyWithWhereWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUpdateManyWithWhereWithoutPenerimaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlastMarketingScalarWhereInputSchema),z.lazy(() => BlastMarketingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateWithoutAdminInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatRoomUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ChatRoomUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatRoomScalarWhereInputSchema),z.lazy(() => ChatRoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutUserInputSchema),z.lazy(() => ChatRoomCreateWithoutUserInputSchema).array(),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatRoomCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatRoomUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatRoomCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatRoomWhereUniqueInputSchema),z.lazy(() => ChatRoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatRoomUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatRoomUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatRoomUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatRoomScalarWhereInputSchema),z.lazy(() => ChatRoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ContohImageUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContohImageCreateWithoutUserInputSchema),z.lazy(() => ContohImageCreateWithoutUserInputSchema).array(),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContohImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContohImageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContohImageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContohImageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContohImageWhereUniqueInputSchema),z.lazy(() => ContohImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContohImageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContohImageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContohImageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ContohImageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContohImageScalarWhereInputSchema),z.lazy(() => ContohImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackCreateWithoutUserInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutUserInputSchema),z.lazy(() => FotoUserCreateWithoutUserInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FotoUserUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FotoUserUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FotoUserScalarWhereInputSchema),z.lazy(() => FotoUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingCreateNestedManyWithoutKatalogInputSchema: z.ZodType<Prisma.BookingCreateNestedManyWithoutKatalogInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKatalogInputSchema),z.lazy(() => BookingCreateWithoutKatalogInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKatalogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedCreateNestedManyWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUncheckedCreateNestedManyWithoutKatalogInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKatalogInputSchema),z.lazy(() => BookingCreateWithoutKatalogInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKatalogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BookingUpdateManyWithoutKatalogNestedInputSchema: z.ZodType<Prisma.BookingUpdateManyWithoutKatalogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKatalogInputSchema),z.lazy(() => BookingCreateWithoutKatalogInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutKatalogInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutKatalogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKatalogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutKatalogInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutKatalogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutKatalogInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutKatalogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutKatalogNestedInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutKatalogNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKatalogInputSchema),z.lazy(() => BookingCreateWithoutKatalogInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKatalogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutKatalogInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutKatalogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKatalogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutKatalogInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutKatalogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutKatalogInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutKatalogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingCreateNestedManyWithoutKuponInputSchema: z.ZodType<Prisma.BookingCreateNestedManyWithoutKuponInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKuponInputSchema),z.lazy(() => BookingCreateWithoutKuponInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKuponInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedCreateNestedManyWithoutKuponInputSchema: z.ZodType<Prisma.BookingUncheckedCreateNestedManyWithoutKuponInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKuponInputSchema),z.lazy(() => BookingCreateWithoutKuponInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKuponInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BookingUpdateManyWithoutKuponNestedInputSchema: z.ZodType<Prisma.BookingUpdateManyWithoutKuponNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKuponInputSchema),z.lazy(() => BookingCreateWithoutKuponInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutKuponInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutKuponInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKuponInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutKuponInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutKuponInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutKuponInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutKuponInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutKuponNestedInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutKuponNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutKuponInputSchema),z.lazy(() => BookingCreateWithoutKuponInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema),z.lazy(() => BookingCreateOrConnectWithoutKuponInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutKuponInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutKuponInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyKuponInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutKuponInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutKuponInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutKuponInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutKuponInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingCreateNestedManyWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingCreateNestedManyWithoutBackgroundInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutBackgroundInputSchema),z.lazy(() => BookingCreateWithoutBackgroundInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema),z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyBackgroundInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedCreateNestedManyWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUncheckedCreateNestedManyWithoutBackgroundInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutBackgroundInputSchema),z.lazy(() => BookingCreateWithoutBackgroundInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema),z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyBackgroundInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BookingUpdateManyWithoutBackgroundNestedInputSchema: z.ZodType<Prisma.BookingUpdateManyWithoutBackgroundNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutBackgroundInputSchema),z.lazy(() => BookingCreateWithoutBackgroundInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema),z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutBackgroundInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutBackgroundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyBackgroundInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutBackgroundInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutBackgroundInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutBackgroundInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutBackgroundInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutBackgroundNestedInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutBackgroundNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutBackgroundInputSchema),z.lazy(() => BookingCreateWithoutBackgroundInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema),z.lazy(() => BookingCreateOrConnectWithoutBackgroundInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutBackgroundInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutBackgroundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyBackgroundInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutBackgroundInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutBackgroundInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutBackgroundInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutBackgroundInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBookingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BackgroundFotoCreateNestedOneWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoCreateNestedOneWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => BackgroundFotoCreateWithoutBookingInputSchema),z.lazy(() => BackgroundFotoUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BackgroundFotoCreateOrConnectWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => BackgroundFotoWhereUniqueInputSchema).optional()
}).strict();

export const KatalogCreateNestedOneWithoutBookingInputSchema: z.ZodType<Prisma.KatalogCreateNestedOneWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => KatalogCreateWithoutBookingInputSchema),z.lazy(() => KatalogUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KatalogCreateOrConnectWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => KatalogWhereUniqueInputSchema).optional()
}).strict();

export const KuponCreateNestedOneWithoutBookingInputSchema: z.ZodType<Prisma.KuponCreateNestedOneWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => KuponCreateWithoutBookingInputSchema),z.lazy(() => KuponUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KuponCreateOrConnectWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => KuponWhereUniqueInputSchema).optional()
}).strict();

export const PembayaranCreateNestedManyWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranCreateNestedManyWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => PembayaranCreateWithoutBookingInputSchema),z.lazy(() => PembayaranCreateWithoutBookingInputSchema).array(),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema),z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PembayaranCreateManyBookingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FotoUserCreateNestedManyWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserCreateNestedManyWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutBookingInputSchema),z.lazy(() => FotoUserCreateWithoutBookingInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyBookingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUncheckedCreateNestedManyWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => PembayaranCreateWithoutBookingInputSchema),z.lazy(() => PembayaranCreateWithoutBookingInputSchema).array(),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema),z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PembayaranCreateManyBookingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUncheckedCreateNestedManyWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutBookingInputSchema),z.lazy(() => FotoUserCreateWithoutBookingInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyBookingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutBookingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBookingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutBookingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookingInputSchema) ]).optional(),
}).strict();

export const BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema: z.ZodType<Prisma.BackgroundFotoUpdateOneRequiredWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => BackgroundFotoCreateWithoutBookingInputSchema),z.lazy(() => BackgroundFotoUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BackgroundFotoCreateOrConnectWithoutBookingInputSchema).optional(),
  upsert: z.lazy(() => BackgroundFotoUpsertWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => BackgroundFotoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BackgroundFotoUpdateWithoutBookingInputSchema),z.lazy(() => BackgroundFotoUncheckedUpdateWithoutBookingInputSchema) ]).optional(),
}).strict();

export const KatalogUpdateOneRequiredWithoutBookingNestedInputSchema: z.ZodType<Prisma.KatalogUpdateOneRequiredWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => KatalogCreateWithoutBookingInputSchema),z.lazy(() => KatalogUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KatalogCreateOrConnectWithoutBookingInputSchema).optional(),
  upsert: z.lazy(() => KatalogUpsertWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => KatalogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KatalogUpdateWithoutBookingInputSchema),z.lazy(() => KatalogUncheckedUpdateWithoutBookingInputSchema) ]).optional(),
}).strict();

export const KuponUpdateOneWithoutBookingNestedInputSchema: z.ZodType<Prisma.KuponUpdateOneWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => KuponCreateWithoutBookingInputSchema),z.lazy(() => KuponUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KuponCreateOrConnectWithoutBookingInputSchema).optional(),
  upsert: z.lazy(() => KuponUpsertWithoutBookingInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => KuponWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KuponUpdateWithoutBookingInputSchema),z.lazy(() => KuponUncheckedUpdateWithoutBookingInputSchema) ]).optional(),
}).strict();

export const EnumBookinStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBookinStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BookinStatusSchema).optional()
}).strict();

export const PembayaranUpdateManyWithoutBookingNestedInputSchema: z.ZodType<Prisma.PembayaranUpdateManyWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => PembayaranCreateWithoutBookingInputSchema),z.lazy(() => PembayaranCreateWithoutBookingInputSchema).array(),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema),z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PembayaranUpsertWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => PembayaranUpsertWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PembayaranCreateManyBookingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PembayaranUpdateWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => PembayaranUpdateWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PembayaranUpdateManyWithWhereWithoutBookingInputSchema),z.lazy(() => PembayaranUpdateManyWithWhereWithoutBookingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PembayaranScalarWhereInputSchema),z.lazy(() => PembayaranScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FotoUserUpdateManyWithoutBookingNestedInputSchema: z.ZodType<Prisma.FotoUserUpdateManyWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutBookingInputSchema),z.lazy(() => FotoUserCreateWithoutBookingInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyBookingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FotoUserUpdateManyWithWhereWithoutBookingInputSchema),z.lazy(() => FotoUserUpdateManyWithWhereWithoutBookingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FotoUserScalarWhereInputSchema),z.lazy(() => FotoUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema: z.ZodType<Prisma.PembayaranUncheckedUpdateManyWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => PembayaranCreateWithoutBookingInputSchema),z.lazy(() => PembayaranCreateWithoutBookingInputSchema).array(),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema),z.lazy(() => PembayaranCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PembayaranUpsertWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => PembayaranUpsertWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PembayaranCreateManyBookingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PembayaranWhereUniqueInputSchema),z.lazy(() => PembayaranWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PembayaranUpdateWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => PembayaranUpdateWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PembayaranUpdateManyWithWhereWithoutBookingInputSchema),z.lazy(() => PembayaranUpdateManyWithWhereWithoutBookingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PembayaranScalarWhereInputSchema),z.lazy(() => PembayaranScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateManyWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => FotoUserCreateWithoutBookingInputSchema),z.lazy(() => FotoUserCreateWithoutBookingInputSchema).array(),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema),z.lazy(() => FotoUserCreateOrConnectWithoutBookingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => FotoUserUpsertWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FotoUserCreateManyBookingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FotoUserWhereUniqueInputSchema),z.lazy(() => FotoUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutBookingInputSchema),z.lazy(() => FotoUserUpdateWithWhereUniqueWithoutBookingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FotoUserUpdateManyWithWhereWithoutBookingInputSchema),z.lazy(() => FotoUserUpdateManyWithWhereWithoutBookingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FotoUserScalarWhereInputSchema),z.lazy(() => FotoUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingCreateNestedOneWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingCreateNestedOneWithoutPembayaranInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutPembayaranInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPembayaranInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutPembayaranInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional()
}).strict();

export const BookingUpdateOneRequiredWithoutPembayaranNestedInputSchema: z.ZodType<Prisma.BookingUpdateOneRequiredWithoutPembayaranNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutPembayaranInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPembayaranInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutPembayaranInputSchema).optional(),
  upsert: z.lazy(() => BookingUpsertWithoutPembayaranInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithoutPembayaranInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutPembayaranInputSchema) ]).optional(),
}).strict();

export const BookingCreateNestedOneWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingCreateNestedOneWithoutFotoUserInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutFotoUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutFotoUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutFotoUserInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutFotoUserInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFotoUserInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFotoUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutFotoUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFotoUserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BookingUpdateOneRequiredWithoutFotoUserNestedInputSchema: z.ZodType<Prisma.BookingUpdateOneRequiredWithoutFotoUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutFotoUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutFotoUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutFotoUserInputSchema).optional(),
  upsert: z.lazy(() => BookingUpsertWithoutFotoUserInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithoutFotoUserInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutFotoUserInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFotoUserNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFotoUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFotoUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutFotoUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFotoUserInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFotoUserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutFotoUserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFotoUserInputSchema) ]).optional(),
}).strict();

export const CommentBlogCreateNestedManyWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogCreateNestedManyWithoutKontenBlogInput> = z.object({
  create: z.union([ z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema).array(),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentBlogCreateManyKontenBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GambarBlogCreateNestedOneWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogCreateNestedOneWithoutKontenBlogInput> = z.object({
  create: z.union([ z.lazy(() => GambarBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => GambarBlogUncheckedCreateWithoutKontenBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GambarBlogCreateOrConnectWithoutKontenBlogInputSchema).optional(),
  connect: z.lazy(() => GambarBlogWhereUniqueInputSchema).optional()
}).strict();

export const CommentBlogUncheckedCreateNestedManyWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUncheckedCreateNestedManyWithoutKontenBlogInput> = z.object({
  create: z.union([ z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema).array(),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentBlogCreateManyKontenBlogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentBlogUpdateManyWithoutKontenBlogNestedInputSchema: z.ZodType<Prisma.CommentBlogUpdateManyWithoutKontenBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema).array(),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentBlogUpsertWithWhereUniqueWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUpsertWithWhereUniqueWithoutKontenBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentBlogCreateManyKontenBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentBlogUpdateWithWhereUniqueWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUpdateWithWhereUniqueWithoutKontenBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentBlogUpdateManyWithWhereWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUpdateManyWithWhereWithoutKontenBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentBlogScalarWhereInputSchema),z.lazy(() => CommentBlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GambarBlogUpdateOneRequiredWithoutKontenBlogNestedInputSchema: z.ZodType<Prisma.GambarBlogUpdateOneRequiredWithoutKontenBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => GambarBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => GambarBlogUncheckedCreateWithoutKontenBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GambarBlogCreateOrConnectWithoutKontenBlogInputSchema).optional(),
  upsert: z.lazy(() => GambarBlogUpsertWithoutKontenBlogInputSchema).optional(),
  connect: z.lazy(() => GambarBlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GambarBlogUpdateWithoutKontenBlogInputSchema),z.lazy(() => GambarBlogUncheckedUpdateWithoutKontenBlogInputSchema) ]).optional(),
}).strict();

export const CommentBlogUncheckedUpdateManyWithoutKontenBlogNestedInputSchema: z.ZodType<Prisma.CommentBlogUncheckedUpdateManyWithoutKontenBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema).array(),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogCreateOrConnectWithoutKontenBlogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentBlogUpsertWithWhereUniqueWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUpsertWithWhereUniqueWithoutKontenBlogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentBlogCreateManyKontenBlogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentBlogWhereUniqueInputSchema),z.lazy(() => CommentBlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentBlogUpdateWithWhereUniqueWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUpdateWithWhereUniqueWithoutKontenBlogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentBlogUpdateManyWithWhereWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUpdateManyWithWhereWithoutKontenBlogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentBlogScalarWhereInputSchema),z.lazy(() => CommentBlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KontenBlogCreateNestedOneWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogCreateNestedOneWithoutGambarBlogInput> = z.object({
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutGambarBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KontenBlogCreateOrConnectWithoutGambarBlogInputSchema).optional(),
  connect: z.lazy(() => KontenBlogWhereUniqueInputSchema).optional()
}).strict();

export const KontenBlogUncheckedCreateNestedOneWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogUncheckedCreateNestedOneWithoutGambarBlogInput> = z.object({
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutGambarBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KontenBlogCreateOrConnectWithoutGambarBlogInputSchema).optional(),
  connect: z.lazy(() => KontenBlogWhereUniqueInputSchema).optional()
}).strict();

export const KontenBlogUpdateOneWithoutGambarBlogNestedInputSchema: z.ZodType<Prisma.KontenBlogUpdateOneWithoutGambarBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutGambarBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KontenBlogCreateOrConnectWithoutGambarBlogInputSchema).optional(),
  upsert: z.lazy(() => KontenBlogUpsertWithoutGambarBlogInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => KontenBlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KontenBlogUpdateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedUpdateWithoutGambarBlogInputSchema) ]).optional(),
}).strict();

export const KontenBlogUncheckedUpdateOneWithoutGambarBlogNestedInputSchema: z.ZodType<Prisma.KontenBlogUncheckedUpdateOneWithoutGambarBlogNestedInput> = z.object({
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutGambarBlogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KontenBlogCreateOrConnectWithoutGambarBlogInputSchema).optional(),
  upsert: z.lazy(() => KontenBlogUpsertWithoutGambarBlogInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => KontenBlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KontenBlogUpdateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedUpdateWithoutGambarBlogInputSchema) ]).optional(),
}).strict();

export const KontenBlogCreateNestedOneWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogCreateNestedOneWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutCommentInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutCommentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KontenBlogCreateOrConnectWithoutCommentInputSchema).optional(),
  connect: z.lazy(() => KontenBlogWhereUniqueInputSchema).optional()
}).strict();

export const KontenBlogUpdateOneRequiredWithoutCommentNestedInputSchema: z.ZodType<Prisma.KontenBlogUpdateOneRequiredWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutCommentInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutCommentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KontenBlogCreateOrConnectWithoutCommentInputSchema).optional(),
  upsert: z.lazy(() => KontenBlogUpsertWithoutCommentInputSchema).optional(),
  connect: z.lazy(() => KontenBlogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KontenBlogUpdateWithoutCommentInputSchema),z.lazy(() => KontenBlogUncheckedUpdateWithoutCommentInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutBlastMarketingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateWithoutBlastMarketingInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutBlastMarketingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateWithoutBlastMarketingInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutBlastMarketingNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutBlastMarketingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateWithoutBlastMarketingInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutBlastMarketingInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutBlastMarketingInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutBlastMarketingInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutBlastMarketingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutBlastMarketingInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutBlastMarketingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutBlastMarketingNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutBlastMarketingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateWithoutBlastMarketingInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema),z.lazy(() => UserCreateOrConnectWithoutBlastMarketingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutBlastMarketingInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutBlastMarketingInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutBlastMarketingInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutBlastMarketingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutBlastMarketingInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutBlastMarketingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HomeCreatecarouselInputSchema: z.ZodType<Prisma.HomeCreatecarouselInput> = z.object({
  set: z.string().array()
}).strict();

export const HomeUpdatecarouselInputSchema: z.ZodType<Prisma.HomeUpdatecarouselInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatRoomAdminInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatRoomAdminInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatRoomUserInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatRoomUserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ChatCreateNestedManyWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatCreateNestedManyWithoutChatRoomInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutChatRoomInputSchema),z.lazy(() => ChatCreateWithoutChatRoomInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema),z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyChatRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatUncheckedCreateNestedManyWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUncheckedCreateNestedManyWithoutChatRoomInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutChatRoomInputSchema),z.lazy(() => ChatCreateWithoutChatRoomInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema),z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyChatRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutChatRoomAdminNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChatRoomAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatRoomAdminInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatRoomAdminInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutChatRoomAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatRoomAdminInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutChatRoomUserNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutChatRoomUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatRoomUserInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatRoomUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutChatRoomUserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatRoomUserInputSchema) ]).optional(),
}).strict();

export const ChatUpdateManyWithoutChatRoomNestedInputSchema: z.ZodType<Prisma.ChatUpdateManyWithoutChatRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutChatRoomInputSchema),z.lazy(() => ChatCreateWithoutChatRoomInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema),z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatUpsertWithWhereUniqueWithoutChatRoomInputSchema),z.lazy(() => ChatUpsertWithWhereUniqueWithoutChatRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyChatRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatUpdateWithWhereUniqueWithoutChatRoomInputSchema),z.lazy(() => ChatUpdateWithWhereUniqueWithoutChatRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatUpdateManyWithWhereWithoutChatRoomInputSchema),z.lazy(() => ChatUpdateManyWithWhereWithoutChatRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatUncheckedUpdateManyWithoutChatRoomNestedInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyWithoutChatRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutChatRoomInputSchema),z.lazy(() => ChatCreateWithoutChatRoomInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema),z.lazy(() => ChatCreateOrConnectWithoutChatRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatUpsertWithWhereUniqueWithoutChatRoomInputSchema),z.lazy(() => ChatUpsertWithWhereUniqueWithoutChatRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyChatRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatUpdateWithWhereUniqueWithoutChatRoomInputSchema),z.lazy(() => ChatUpdateWithWhereUniqueWithoutChatRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatUpdateManyWithWhereWithoutChatRoomInputSchema),z.lazy(() => ChatUpdateManyWithWhereWithoutChatRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatRoomCreateNestedOneWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomCreateNestedOneWithoutChatInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutChatInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatRoomCreateOrConnectWithoutChatInputSchema).optional(),
  connect: z.lazy(() => ChatRoomWhereUniqueInputSchema).optional()
}).strict();

export const ChatRoomUpdateOneRequiredWithoutChatNestedInputSchema: z.ZodType<Prisma.ChatRoomUpdateOneRequiredWithoutChatNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutChatInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutChatInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatRoomCreateOrConnectWithoutChatInputSchema).optional(),
  upsert: z.lazy(() => ChatRoomUpsertWithoutChatInputSchema).optional(),
  connect: z.lazy(() => ChatRoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithoutChatInputSchema),z.lazy(() => ChatRoomUncheckedUpdateWithoutChatInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFeedbackInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFeedbackInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackAnswerCreateNestedManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateNestedManyWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyFeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackAnswerUncheckedCreateNestedManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedCreateNestedManyWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyFeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFeedbackInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFeedbackInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackInputSchema) ]).optional(),
}).strict();

export const FeedbackAnswerUpdateManyWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateManyWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyFeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutFeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackAnswerScalarWhereInputSchema),z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackAnswerUncheckedUpdateManyWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateManyWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyFeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutFeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackAnswerScalarWhereInputSchema),z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCreateNestedOneWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackCreateNestedOneWithoutFeedbackAnswerInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutFeedbackAnswerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackCreateOrConnectWithoutFeedbackAnswerInputSchema).optional(),
  connect: z.lazy(() => FeedbackWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackQuestionCreateNestedOneWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionCreateNestedOneWithoutFeedbackAnswerInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackQuestionCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackQuestionUncheckedCreateWithoutFeedbackAnswerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackQuestionCreateOrConnectWithoutFeedbackAnswerInputSchema).optional(),
  connect: z.lazy(() => FeedbackQuestionWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackUpdateOneRequiredWithoutFeedbackAnswerNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateOneRequiredWithoutFeedbackAnswerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutFeedbackAnswerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackCreateOrConnectWithoutFeedbackAnswerInputSchema).optional(),
  upsert: z.lazy(() => FeedbackUpsertWithoutFeedbackAnswerInputSchema).optional(),
  connect: z.lazy(() => FeedbackWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutFeedbackAnswerInputSchema) ]).optional(),
}).strict();

export const FeedbackQuestionUpdateOneRequiredWithoutFeedbackAnswerNestedInputSchema: z.ZodType<Prisma.FeedbackQuestionUpdateOneRequiredWithoutFeedbackAnswerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackQuestionCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackQuestionUncheckedCreateWithoutFeedbackAnswerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackQuestionCreateOrConnectWithoutFeedbackAnswerInputSchema).optional(),
  upsert: z.lazy(() => FeedbackQuestionUpsertWithoutFeedbackAnswerInputSchema).optional(),
  connect: z.lazy(() => FeedbackQuestionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FeedbackQuestionUpdateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackQuestionUncheckedUpdateWithoutFeedbackAnswerInputSchema) ]).optional(),
}).strict();

export const FeedbackAnswerCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackAnswerUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackAnswerScalarWhereInputSchema),z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),z.lazy(() => FeedbackAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackAnswerScalarWhereInputSchema),z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutContohImageInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutContohImageInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutContohImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutContohImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutContohImageInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutContohImageNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutContohImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutContohImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutContohImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutContohImageInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutContohImageInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutContohImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutContohImageInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumBookinStatusFilterSchema: z.ZodType<Prisma.NestedEnumBookinStatusFilter> = z.object({
  equals: z.lazy(() => BookinStatusSchema).optional(),
  in: z.lazy(() => BookinStatusSchema).array().optional(),
  notIn: z.lazy(() => BookinStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => NestedEnumBookinStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBookinStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBookinStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookinStatusSchema).optional(),
  in: z.lazy(() => BookinStatusSchema).array().optional(),
  notIn: z.lazy(() => BookinStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => NestedEnumBookinStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookinStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookinStatusFilterSchema).optional()
}).strict();

export const BookingCreateWithoutUserInputSchema: z.ZodType<Prisma.BookingCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  background: z.lazy(() => BackgroundFotoCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalog: z.lazy(() => KatalogCreateNestedOneWithoutBookingInputSchema),
  kupon: z.lazy(() => KuponCreateNestedOneWithoutBookingInputSchema).optional(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BookingCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BookingCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => BookingCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlastMarketingCreateWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingCreateWithoutPenerimaInput> = z.object({
  id: z.string().optional(),
  subjek: z.string(),
  isi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BlastMarketingUncheckedCreateWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedCreateWithoutPenerimaInput> = z.object({
  id: z.string().optional(),
  subjek: z.string(),
  isi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BlastMarketingCreateOrConnectWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingCreateOrConnectWithoutPenerimaInput> = z.object({
  where: z.lazy(() => BlastMarketingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema) ]),
}).strict();

export const ChatRoomCreateWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomCreateWithoutAdminInput> = z.object({
  Id: z.string().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutChatRoomUserInputSchema).optional(),
  Chat: z.lazy(() => ChatCreateNestedManyWithoutChatRoomInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUncheckedCreateWithoutAdminInput> = z.object({
  Id: z.string().optional(),
  userId: z.string().optional().nullable(),
  Chat: z.lazy(() => ChatUncheckedCreateNestedManyWithoutChatRoomInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ChatRoomCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.ChatRoomCreateManyAdminInputEnvelope> = z.object({
  data: z.lazy(() => ChatRoomCreateManyAdminInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChatRoomCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomCreateWithoutUserInput> = z.object({
  Id: z.string().optional(),
  admin: z.lazy(() => UserCreateNestedOneWithoutChatRoomAdminInputSchema),
  Chat: z.lazy(() => ChatCreateNestedManyWithoutChatRoomInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUncheckedCreateWithoutUserInput> = z.object({
  Id: z.string().optional(),
  adminId: z.string(),
  Chat: z.lazy(() => ChatUncheckedCreateNestedManyWithoutChatRoomInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatRoomCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ChatRoomCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ChatRoomCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ContohImageCreateWithoutUserInputSchema: z.ZodType<Prisma.ContohImageCreateWithoutUserInput> = z.object({
  id: z.string().optional()
}).strict();

export const ContohImageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional()
}).strict();

export const ContohImageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ContohImageCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ContohImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContohImageCreateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ContohImageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ContohImageCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ContohImageCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackCreateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerCreateNestedManyWithoutFeedbackInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => FeedbackCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FotoUserCreateWithoutUserInputSchema: z.ZodType<Prisma.FotoUserCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutFotoUserInputSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  bookingId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FotoUserCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FotoUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FotoUserCreateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FotoUserCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FotoUserCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => FotoUserCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BookingUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BookingUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookingUpdateWithoutUserInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BookingUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BookingUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateWithoutUserInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BookingUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BookingUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateManyMutationInputSchema),z.lazy(() => BookingUncheckedUpdateManyWithoutBookingInputSchema) ]),
}).strict();

export const BookingScalarWhereInputSchema: z.ZodType<Prisma.BookingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backgroundWarna: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  peliharaan: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  harga: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jadwal: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  durasi: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jumlahOrang: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  katalogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kuponId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookinStatusFilterSchema),z.lazy(() => BookinStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const BlastMarketingUpsertWithWhereUniqueWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUpsertWithWhereUniqueWithoutPenerimaInput> = z.object({
  where: z.lazy(() => BlastMarketingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlastMarketingUpdateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedUpdateWithoutPenerimaInputSchema) ]),
  create: z.union([ z.lazy(() => BlastMarketingCreateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedCreateWithoutPenerimaInputSchema) ]),
}).strict();

export const BlastMarketingUpdateWithWhereUniqueWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUpdateWithWhereUniqueWithoutPenerimaInput> = z.object({
  where: z.lazy(() => BlastMarketingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlastMarketingUpdateWithoutPenerimaInputSchema),z.lazy(() => BlastMarketingUncheckedUpdateWithoutPenerimaInputSchema) ]),
}).strict();

export const BlastMarketingUpdateManyWithWhereWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUpdateManyWithWhereWithoutPenerimaInput> = z.object({
  where: z.lazy(() => BlastMarketingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlastMarketingUpdateManyMutationInputSchema),z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutBlastMarketingInputSchema) ]),
}).strict();

export const BlastMarketingScalarWhereInputSchema: z.ZodType<Prisma.BlastMarketingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlastMarketingScalarWhereInputSchema),z.lazy(() => BlastMarketingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlastMarketingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlastMarketingScalarWhereInputSchema),z.lazy(() => BlastMarketingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subjek: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatRoomUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ChatRoomUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatRoomUpdateWithoutAdminInputSchema),z.lazy(() => ChatRoomUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const ChatRoomUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => ChatRoomScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatRoomUpdateManyMutationInputSchema),z.lazy(() => ChatRoomUncheckedUpdateManyWithoutChatRoomAdminInputSchema) ]),
}).strict();

export const ChatRoomScalarWhereInputSchema: z.ZodType<Prisma.ChatRoomScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatRoomScalarWhereInputSchema),z.lazy(() => ChatRoomScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatRoomScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatRoomScalarWhereInputSchema),z.lazy(() => ChatRoomScalarWhereInputSchema).array() ]).optional(),
  Id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatRoomUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatRoomUpdateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatRoomUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatRoomUpdateWithoutUserInputSchema),z.lazy(() => ChatRoomUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ChatRoomUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ChatRoomScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatRoomUpdateManyMutationInputSchema),z.lazy(() => ChatRoomUncheckedUpdateManyWithoutChatRoomUserInputSchema) ]),
}).strict();

export const ContohImageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ContohImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContohImageUpdateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ContohImageCreateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ContohImageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ContohImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContohImageUpdateWithoutUserInputSchema),z.lazy(() => ContohImageUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ContohImageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ContohImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContohImageUpdateManyMutationInputSchema),z.lazy(() => ContohImageUncheckedUpdateManyWithoutContohImageInputSchema) ]),
}).strict();

export const ContohImageScalarWhereInputSchema: z.ZodType<Prisma.ContohImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContohImageScalarWhereInputSchema),z.lazy(() => ContohImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContohImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContohImageScalarWhereInputSchema),z.lazy(() => ContohImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FeedbackUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutUserInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FeedbackUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FeedbackScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateManyMutationInputSchema),z.lazy(() => FeedbackUncheckedUpdateManyWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackScalarWhereInputSchema: z.ZodType<Prisma.FeedbackScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isiFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  namaPenulis: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FotoUserUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FotoUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FotoUserUpdateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FotoUserCreateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FotoUserUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FotoUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FotoUserUpdateWithoutUserInputSchema),z.lazy(() => FotoUserUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FotoUserUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FotoUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FotoUserUpdateManyMutationInputSchema),z.lazy(() => FotoUserUncheckedUpdateManyWithoutFotoUserInputSchema) ]),
}).strict();

export const FotoUserScalarWhereInputSchema: z.ZodType<Prisma.FotoUserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FotoUserScalarWhereInputSchema),z.lazy(() => FotoUserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FotoUserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FotoUserScalarWhereInputSchema),z.lazy(() => FotoUserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BookingCreateWithoutKatalogInputSchema: z.ZodType<Prisma.BookingCreateWithoutKatalogInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookingInputSchema),
  background: z.lazy(() => BackgroundFotoCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  kupon: z.lazy(() => KuponCreateNestedOneWithoutBookingInputSchema).optional(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutKatalogInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingCreateOrConnectWithoutKatalogInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutKatalogInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema) ]),
}).strict();

export const BookingCreateManyKatalogInputEnvelopeSchema: z.ZodType<Prisma.BookingCreateManyKatalogInputEnvelope> = z.object({
  data: z.lazy(() => BookingCreateManyKatalogInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BookingUpsertWithWhereUniqueWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUpsertWithWhereUniqueWithoutKatalogInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookingUpdateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutKatalogInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKatalogInputSchema) ]),
}).strict();

export const BookingUpdateWithWhereUniqueWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUpdateWithWhereUniqueWithoutKatalogInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateWithoutKatalogInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutKatalogInputSchema) ]),
}).strict();

export const BookingUpdateManyWithWhereWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUpdateManyWithWhereWithoutKatalogInput> = z.object({
  where: z.lazy(() => BookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateManyMutationInputSchema),z.lazy(() => BookingUncheckedUpdateManyWithoutBookingInputSchema) ]),
}).strict();

export const BookingCreateWithoutKuponInputSchema: z.ZodType<Prisma.BookingCreateWithoutKuponInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookingInputSchema),
  background: z.lazy(() => BackgroundFotoCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalog: z.lazy(() => KatalogCreateNestedOneWithoutBookingInputSchema),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateWithoutKuponInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutKuponInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalogId: z.string(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingCreateOrConnectWithoutKuponInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutKuponInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema) ]),
}).strict();

export const BookingCreateManyKuponInputEnvelopeSchema: z.ZodType<Prisma.BookingCreateManyKuponInputEnvelope> = z.object({
  data: z.lazy(() => BookingCreateManyKuponInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BookingUpsertWithWhereUniqueWithoutKuponInputSchema: z.ZodType<Prisma.BookingUpsertWithWhereUniqueWithoutKuponInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookingUpdateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutKuponInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedCreateWithoutKuponInputSchema) ]),
}).strict();

export const BookingUpdateWithWhereUniqueWithoutKuponInputSchema: z.ZodType<Prisma.BookingUpdateWithWhereUniqueWithoutKuponInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateWithoutKuponInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutKuponInputSchema) ]),
}).strict();

export const BookingUpdateManyWithWhereWithoutKuponInputSchema: z.ZodType<Prisma.BookingUpdateManyWithWhereWithoutKuponInput> = z.object({
  where: z.lazy(() => BookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateManyMutationInputSchema),z.lazy(() => BookingUncheckedUpdateManyWithoutBookingInputSchema) ]),
}).strict();

export const BookingCreateWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingCreateWithoutBackgroundInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalog: z.lazy(() => KatalogCreateNestedOneWithoutBookingInputSchema),
  kupon: z.lazy(() => KuponCreateNestedOneWithoutBookingInputSchema).optional(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutBackgroundInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingCreateOrConnectWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutBackgroundInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema) ]),
}).strict();

export const BookingCreateManyBackgroundInputEnvelopeSchema: z.ZodType<Prisma.BookingCreateManyBackgroundInputEnvelope> = z.object({
  data: z.lazy(() => BookingCreateManyBackgroundInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BookingUpsertWithWhereUniqueWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUpsertWithWhereUniqueWithoutBackgroundInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookingUpdateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutBackgroundInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedCreateWithoutBackgroundInputSchema) ]),
}).strict();

export const BookingUpdateWithWhereUniqueWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUpdateWithWhereUniqueWithoutBackgroundInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateWithoutBackgroundInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutBackgroundInputSchema) ]),
}).strict();

export const BookingUpdateManyWithWhereWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUpdateManyWithWhereWithoutBackgroundInput> = z.object({
  where: z.lazy(() => BookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateManyMutationInputSchema),z.lazy(() => BookingUncheckedUpdateManyWithoutBookingInputSchema) ]),
}).strict();

export const UserCreateWithoutBookingInputSchema: z.ZodType<Prisma.UserCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBookingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const BackgroundFotoCreateWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoCreateWithoutBookingInput> = z.object({
  warna: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BackgroundFotoUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoUncheckedCreateWithoutBookingInput> = z.object({
  warna: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BackgroundFotoCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => BackgroundFotoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BackgroundFotoCreateWithoutBookingInputSchema),z.lazy(() => BackgroundFotoUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const KatalogCreateWithoutBookingInputSchema: z.ZodType<Prisma.KatalogCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  durasi: z.number(),
  harga: z.number(),
  jumlahOrang: z.number().optional().nullable(),
  deskripsi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const KatalogUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.KatalogUncheckedCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  durasi: z.number(),
  harga: z.number(),
  jumlahOrang: z.number().optional().nullable(),
  deskripsi: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const KatalogCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.KatalogCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => KatalogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KatalogCreateWithoutBookingInputSchema),z.lazy(() => KatalogUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const KuponCreateWithoutBookingInputSchema: z.ZodType<Prisma.KuponCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  kode: z.string(),
  diskon: z.number(),
  kuotaPemakaian: z.number().optional(),
  kuotaTerpakai: z.number().optional(),
  active: z.boolean().optional(),
  tanggal: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KuponUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.KuponUncheckedCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  kode: z.string(),
  diskon: z.number(),
  kuotaPemakaian: z.number().optional(),
  kuotaTerpakai: z.number().optional(),
  active: z.boolean().optional(),
  tanggal: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KuponCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.KuponCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => KuponWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KuponCreateWithoutBookingInputSchema),z.lazy(() => KuponUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const PembayaranCreateWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  dp: z.boolean(),
  jumlah: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PembayaranUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUncheckedCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  dp: z.boolean(),
  jumlah: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PembayaranCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => PembayaranWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PembayaranCreateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const PembayaranCreateManyBookingInputEnvelopeSchema: z.ZodType<Prisma.PembayaranCreateManyBookingInputEnvelope> = z.object({
  data: z.lazy(() => PembayaranCreateManyBookingInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FotoUserCreateWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFotoUserInputSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUncheckedCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => FotoUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FotoUserCreateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const FotoUserCreateManyBookingInputEnvelopeSchema: z.ZodType<Prisma.FotoUserCreateManyBookingInputEnvelope> = z.object({
  data: z.lazy(() => FotoUserCreateManyBookingInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutBookingInputSchema: z.ZodType<Prisma.UserUpsertWithoutBookingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBookingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBookingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const UserUpdateWithoutBookingInputSchema: z.ZodType<Prisma.UserUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BackgroundFotoUpsertWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoUpsertWithoutBookingInput> = z.object({
  update: z.union([ z.lazy(() => BackgroundFotoUpdateWithoutBookingInputSchema),z.lazy(() => BackgroundFotoUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => BackgroundFotoCreateWithoutBookingInputSchema),z.lazy(() => BackgroundFotoUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const BackgroundFotoUpdateWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoUpdateWithoutBookingInput> = z.object({
  warna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BackgroundFotoUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.BackgroundFotoUncheckedUpdateWithoutBookingInput> = z.object({
  warna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KatalogUpsertWithoutBookingInputSchema: z.ZodType<Prisma.KatalogUpsertWithoutBookingInput> = z.object({
  update: z.union([ z.lazy(() => KatalogUpdateWithoutBookingInputSchema),z.lazy(() => KatalogUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => KatalogCreateWithoutBookingInputSchema),z.lazy(() => KatalogUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const KatalogUpdateWithoutBookingInputSchema: z.ZodType<Prisma.KatalogUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deskripsi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KatalogUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.KatalogUncheckedUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deskripsi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KuponUpsertWithoutBookingInputSchema: z.ZodType<Prisma.KuponUpsertWithoutBookingInput> = z.object({
  update: z.union([ z.lazy(() => KuponUpdateWithoutBookingInputSchema),z.lazy(() => KuponUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => KuponCreateWithoutBookingInputSchema),z.lazy(() => KuponUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const KuponUpdateWithoutBookingInputSchema: z.ZodType<Prisma.KuponUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diskon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaPemakaian: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaTerpakai: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tanggal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KuponUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.KuponUncheckedUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diskon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaPemakaian: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuotaTerpakai: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tanggal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranUpsertWithWhereUniqueWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUpsertWithWhereUniqueWithoutBookingInput> = z.object({
  where: z.lazy(() => PembayaranWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PembayaranUpdateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => PembayaranCreateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const PembayaranUpdateWithWhereUniqueWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUpdateWithWhereUniqueWithoutBookingInput> = z.object({
  where: z.lazy(() => PembayaranWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PembayaranUpdateWithoutBookingInputSchema),z.lazy(() => PembayaranUncheckedUpdateWithoutBookingInputSchema) ]),
}).strict();

export const PembayaranUpdateManyWithWhereWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUpdateManyWithWhereWithoutBookingInput> = z.object({
  where: z.lazy(() => PembayaranScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PembayaranUpdateManyMutationInputSchema),z.lazy(() => PembayaranUncheckedUpdateManyWithoutPembayaranInputSchema) ]),
}).strict();

export const PembayaranScalarWhereInputSchema: z.ZodType<Prisma.PembayaranScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PembayaranScalarWhereInputSchema),z.lazy(() => PembayaranScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PembayaranScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PembayaranScalarWhereInputSchema),z.lazy(() => PembayaranScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookingId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  jumlah: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FotoUserUpsertWithWhereUniqueWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUpsertWithWhereUniqueWithoutBookingInput> = z.object({
  where: z.lazy(() => FotoUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FotoUserUpdateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => FotoUserCreateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const FotoUserUpdateWithWhereUniqueWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUpdateWithWhereUniqueWithoutBookingInput> = z.object({
  where: z.lazy(() => FotoUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FotoUserUpdateWithoutBookingInputSchema),z.lazy(() => FotoUserUncheckedUpdateWithoutBookingInputSchema) ]),
}).strict();

export const FotoUserUpdateManyWithWhereWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUpdateManyWithWhereWithoutBookingInput> = z.object({
  where: z.lazy(() => FotoUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FotoUserUpdateManyMutationInputSchema),z.lazy(() => FotoUserUncheckedUpdateManyWithoutFotoUserInputSchema) ]),
}).strict();

export const BookingCreateWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingCreateWithoutPembayaranInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookingInputSchema),
  background: z.lazy(() => BackgroundFotoCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalog: z.lazy(() => KatalogCreateNestedOneWithoutBookingInputSchema),
  kupon: z.lazy(() => KuponCreateNestedOneWithoutBookingInputSchema).optional(),
  status: z.lazy(() => BookinStatusSchema),
  fotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutPembayaranInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  fotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingCreateOrConnectWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutPembayaranInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutPembayaranInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPembayaranInputSchema) ]),
}).strict();

export const BookingUpsertWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingUpsertWithoutPembayaranInput> = z.object({
  update: z.union([ z.lazy(() => BookingUpdateWithoutPembayaranInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutPembayaranInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutPembayaranInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPembayaranInputSchema) ]),
}).strict();

export const BookingUpdateWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingUpdateWithoutPembayaranInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  background: z.lazy(() => BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalog: z.lazy(() => KatalogUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  kupon: z.lazy(() => KuponUpdateOneWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fotoUser: z.lazy(() => FotoUserUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateWithoutPembayaranInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutPembayaranInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingCreateWithoutFotoUserInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookingInputSchema),
  background: z.lazy(() => BackgroundFotoCreateNestedOneWithoutBookingInputSchema),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalog: z.lazy(() => KatalogCreateNestedOneWithoutBookingInputSchema),
  kupon: z.lazy(() => KuponCreateNestedOneWithoutBookingInputSchema).optional(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUncheckedCreateWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutFotoUserInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number(),
  jadwal: z.coerce.date(),
  durasi: z.number(),
  jumlahOrang: z.number(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  Pembayaran: z.lazy(() => PembayaranUncheckedCreateNestedManyWithoutBookingInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingCreateOrConnectWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutFotoUserInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutFotoUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutFotoUserInputSchema) ]),
}).strict();

export const UserCreateWithoutFotoUserInputSchema: z.ZodType<Prisma.UserCreateWithoutFotoUserInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFotoUserInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFotoUserInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFotoUserInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFotoUserInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFotoUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutFotoUserInputSchema) ]),
}).strict();

export const BookingUpsertWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingUpsertWithoutFotoUserInput> = z.object({
  update: z.union([ z.lazy(() => BookingUpdateWithoutFotoUserInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutFotoUserInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutFotoUserInputSchema),z.lazy(() => BookingUncheckedCreateWithoutFotoUserInputSchema) ]),
}).strict();

export const BookingUpdateWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingUpdateWithoutFotoUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  background: z.lazy(() => BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalog: z.lazy(() => KatalogUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  kupon: z.lazy(() => KuponUpdateOneWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateWithoutFotoUserInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutFotoUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutFotoUserInputSchema: z.ZodType<Prisma.UserUpsertWithoutFotoUserInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFotoUserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFotoUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFotoUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutFotoUserInputSchema) ]),
}).strict();

export const UserUpdateWithoutFotoUserInputSchema: z.ZodType<Prisma.UserUpdateWithoutFotoUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFotoUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFotoUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentBlogCreateWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogCreateWithoutKontenBlogInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  isi: z.string(),
  like: z.number(),
  dislike: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CommentBlogUncheckedCreateWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUncheckedCreateWithoutKontenBlogInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  isi: z.string(),
  like: z.number(),
  dislike: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CommentBlogCreateOrConnectWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogCreateOrConnectWithoutKontenBlogInput> = z.object({
  where: z.lazy(() => CommentBlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema) ]),
}).strict();

export const CommentBlogCreateManyKontenBlogInputEnvelopeSchema: z.ZodType<Prisma.CommentBlogCreateManyKontenBlogInputEnvelope> = z.object({
  data: z.lazy(() => CommentBlogCreateManyKontenBlogInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GambarBlogCreateWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogCreateWithoutKontenBlogInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GambarBlogUncheckedCreateWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogUncheckedCreateWithoutKontenBlogInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GambarBlogCreateOrConnectWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogCreateOrConnectWithoutKontenBlogInput> = z.object({
  where: z.lazy(() => GambarBlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GambarBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => GambarBlogUncheckedCreateWithoutKontenBlogInputSchema) ]),
}).strict();

export const CommentBlogUpsertWithWhereUniqueWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUpsertWithWhereUniqueWithoutKontenBlogInput> = z.object({
  where: z.lazy(() => CommentBlogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentBlogUpdateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedUpdateWithoutKontenBlogInputSchema) ]),
  create: z.union([ z.lazy(() => CommentBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedCreateWithoutKontenBlogInputSchema) ]),
}).strict();

export const CommentBlogUpdateWithWhereUniqueWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUpdateWithWhereUniqueWithoutKontenBlogInput> = z.object({
  where: z.lazy(() => CommentBlogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentBlogUpdateWithoutKontenBlogInputSchema),z.lazy(() => CommentBlogUncheckedUpdateWithoutKontenBlogInputSchema) ]),
}).strict();

export const CommentBlogUpdateManyWithWhereWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUpdateManyWithWhereWithoutKontenBlogInput> = z.object({
  where: z.lazy(() => CommentBlogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentBlogUpdateManyMutationInputSchema),z.lazy(() => CommentBlogUncheckedUpdateManyWithoutCommentInputSchema) ]),
}).strict();

export const CommentBlogScalarWhereInputSchema: z.ZodType<Prisma.CommentBlogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentBlogScalarWhereInputSchema),z.lazy(() => CommentBlogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentBlogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentBlogScalarWhereInputSchema),z.lazy(() => CommentBlogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  kontenBlogId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isi: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  like: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dislike: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GambarBlogUpsertWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogUpsertWithoutKontenBlogInput> = z.object({
  update: z.union([ z.lazy(() => GambarBlogUpdateWithoutKontenBlogInputSchema),z.lazy(() => GambarBlogUncheckedUpdateWithoutKontenBlogInputSchema) ]),
  create: z.union([ z.lazy(() => GambarBlogCreateWithoutKontenBlogInputSchema),z.lazy(() => GambarBlogUncheckedCreateWithoutKontenBlogInputSchema) ]),
}).strict();

export const GambarBlogUpdateWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogUpdateWithoutKontenBlogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GambarBlogUncheckedUpdateWithoutKontenBlogInputSchema: z.ZodType<Prisma.GambarBlogUncheckedUpdateWithoutKontenBlogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogCreateWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogCreateWithoutGambarBlogInput> = z.object({
  id: z.string().optional(),
  judul: z.string(),
  comment: z.lazy(() => CommentBlogCreateNestedManyWithoutKontenBlogInputSchema).optional(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogUncheckedCreateWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogUncheckedCreateWithoutGambarBlogInput> = z.object({
  id: z.string().optional(),
  judul: z.string(),
  comment: z.lazy(() => CommentBlogUncheckedCreateNestedManyWithoutKontenBlogInputSchema).optional(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogCreateOrConnectWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogCreateOrConnectWithoutGambarBlogInput> = z.object({
  where: z.lazy(() => KontenBlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutGambarBlogInputSchema) ]),
}).strict();

export const KontenBlogUpsertWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogUpsertWithoutGambarBlogInput> = z.object({
  update: z.union([ z.lazy(() => KontenBlogUpdateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedUpdateWithoutGambarBlogInputSchema) ]),
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutGambarBlogInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutGambarBlogInputSchema) ]),
}).strict();

export const KontenBlogUpdateWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogUpdateWithoutGambarBlogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentBlogUpdateManyWithoutKontenBlogNestedInputSchema).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogUncheckedUpdateWithoutGambarBlogInputSchema: z.ZodType<Prisma.KontenBlogUncheckedUpdateWithoutGambarBlogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentBlogUncheckedUpdateManyWithoutKontenBlogNestedInputSchema).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogCreateWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogCreateWithoutCommentInput> = z.object({
  id: z.string().optional(),
  judul: z.string(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number(),
  gambarBlog: z.lazy(() => GambarBlogCreateNestedOneWithoutKontenBlogInputSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogUncheckedCreateWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogUncheckedCreateWithoutCommentInput> = z.object({
  id: z.string().optional(),
  judul: z.string(),
  isi: z.string(),
  posted: z.boolean(),
  like: z.number(),
  gambarBlogId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const KontenBlogCreateOrConnectWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogCreateOrConnectWithoutCommentInput> = z.object({
  where: z.lazy(() => KontenBlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutCommentInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const KontenBlogUpsertWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogUpsertWithoutCommentInput> = z.object({
  update: z.union([ z.lazy(() => KontenBlogUpdateWithoutCommentInputSchema),z.lazy(() => KontenBlogUncheckedUpdateWithoutCommentInputSchema) ]),
  create: z.union([ z.lazy(() => KontenBlogCreateWithoutCommentInputSchema),z.lazy(() => KontenBlogUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const KontenBlogUpdateWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gambarBlog: z.lazy(() => GambarBlogUpdateOneRequiredWithoutKontenBlogNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KontenBlogUncheckedUpdateWithoutCommentInputSchema: z.ZodType<Prisma.KontenBlogUncheckedUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  judul: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  posted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gambarBlogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserCreateWithoutBlastMarketingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBlastMarketingInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBlastMarketingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutBlastMarketingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlastMarketingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlastMarketingInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutBlastMarketingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutBlastMarketingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlastMarketingInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutBlastMarketingInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutPenerimaInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nama: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hp: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserCreateWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserCreateWithoutChatRoomAdminInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChatRoomAdminInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatRoomAdminInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomAdminInputSchema) ]),
}).strict();

export const UserCreateWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserCreateWithoutChatRoomUserInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChatRoomUserInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatRoomUserInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomUserInputSchema) ]),
}).strict();

export const ChatCreateWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatCreateWithoutChatRoomInput> = z.object({
  id: z.string().optional(),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatUncheckedCreateWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUncheckedCreateWithoutChatRoomInput> = z.object({
  id: z.string().optional(),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatCreateOrConnectWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatCreateOrConnectWithoutChatRoomInput> = z.object({
  where: z.lazy(() => ChatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatCreateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema) ]),
}).strict();

export const ChatCreateManyChatRoomInputEnvelopeSchema: z.ZodType<Prisma.ChatCreateManyChatRoomInputEnvelope> = z.object({
  data: z.lazy(() => ChatCreateManyChatRoomInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatRoomAdminInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatRoomAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatRoomAdminInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomAdminInputSchema) ]),
}).strict();

export const UserUpdateWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserUpdateWithoutChatRoomAdminInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChatRoomAdminInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatRoomUserInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatRoomUserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatRoomUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatRoomUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatRoomUserInputSchema) ]),
}).strict();

export const UserUpdateWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserUpdateWithoutChatRoomUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutChatRoomUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChatRoomUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ChatUpsertWithWhereUniqueWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUpsertWithWhereUniqueWithoutChatRoomInput> = z.object({
  where: z.lazy(() => ChatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatUpdateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedUpdateWithoutChatRoomInputSchema) ]),
  create: z.union([ z.lazy(() => ChatCreateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedCreateWithoutChatRoomInputSchema) ]),
}).strict();

export const ChatUpdateWithWhereUniqueWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUpdateWithWhereUniqueWithoutChatRoomInput> = z.object({
  where: z.lazy(() => ChatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatUpdateWithoutChatRoomInputSchema),z.lazy(() => ChatUncheckedUpdateWithoutChatRoomInputSchema) ]),
}).strict();

export const ChatUpdateManyWithWhereWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUpdateManyWithWhereWithoutChatRoomInput> = z.object({
  where: z.lazy(() => ChatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatUpdateManyMutationInputSchema),z.lazy(() => ChatUncheckedUpdateManyWithoutChatInputSchema) ]),
}).strict();

export const ChatScalarWhereInputSchema: z.ZodType<Prisma.ChatScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chatRoomId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chat: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminSend: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatRoomCreateWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomCreateWithoutChatInput> = z.object({
  Id: z.string().optional(),
  admin: z.lazy(() => UserCreateNestedOneWithoutChatRoomAdminInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutChatRoomUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomUncheckedCreateWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomUncheckedCreateWithoutChatInput> = z.object({
  Id: z.string().optional(),
  adminId: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomCreateOrConnectWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomCreateOrConnectWithoutChatInput> = z.object({
  where: z.lazy(() => ChatRoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutChatInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutChatInputSchema) ]),
}).strict();

export const ChatRoomUpsertWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomUpsertWithoutChatInput> = z.object({
  update: z.union([ z.lazy(() => ChatRoomUpdateWithoutChatInputSchema),z.lazy(() => ChatRoomUncheckedUpdateWithoutChatInputSchema) ]),
  create: z.union([ z.lazy(() => ChatRoomCreateWithoutChatInputSchema),z.lazy(() => ChatRoomUncheckedCreateWithoutChatInputSchema) ]),
}).strict();

export const ChatRoomUpdateWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomUpdateWithoutChatInput> = z.object({
  Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => UserUpdateOneRequiredWithoutChatRoomAdminNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutChatRoomUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateWithoutChatInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateWithoutChatInput> = z.object({
  Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserCreateWithoutFeedbackInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFeedbackInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFeedbackInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFeedbackInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackAnswerCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateWithoutFeedbackInput> = z.object({
  id: z.string().optional(),
  question: z.lazy(() => FeedbackQuestionCreateNestedOneWithoutFeedbackAnswerInputSchema),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedCreateWithoutFeedbackInput> = z.object({
  id: z.string().optional(),
  feedbackQuestionId: z.string(),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerCreateOrConnectWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateOrConnectWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackAnswerCreateManyFeedbackInputEnvelopeSchema: z.ZodType<Prisma.FeedbackAnswerCreateManyFeedbackInputEnvelope> = z.object({
  data: z.lazy(() => FeedbackAnswerCreateManyFeedbackInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUpsertWithoutFeedbackInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFeedbackInputSchema),z.lazy(() => UserUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const UserUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FeedbackAnswerUpsertWithWhereUniqueWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUpsertWithWhereUniqueWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackAnswerUpdateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedUpdateWithoutFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackAnswerUpdateWithWhereUniqueWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateWithWhereUniqueWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackAnswerUpdateWithoutFeedbackInputSchema),z.lazy(() => FeedbackAnswerUncheckedUpdateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackAnswerUpdateManyWithWhereWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateManyWithWhereWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackAnswerUpdateManyMutationInputSchema),z.lazy(() => FeedbackAnswerUncheckedUpdateManyWithoutFeedbackAnswerInputSchema) ]),
}).strict();

export const FeedbackAnswerScalarWhereInputSchema: z.ZodType<Prisma.FeedbackAnswerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackAnswerScalarWhereInputSchema),z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackAnswerScalarWhereInputSchema),z.lazy(() => FeedbackAnswerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedbackId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedbackQuestionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FeedbackCreateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutFeedbackAnswerInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFeedbackInputSchema),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackUncheckedCreateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutFeedbackAnswerInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackCreateOrConnectWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutFeedbackAnswerInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutFeedbackAnswerInputSchema) ]),
}).strict();

export const FeedbackQuestionCreateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionCreateWithoutFeedbackAnswerInput> = z.object({
  id: z.string().optional(),
  pertanyaan: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackQuestionUncheckedCreateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionUncheckedCreateWithoutFeedbackAnswerInput> = z.object({
  id: z.string().optional(),
  pertanyaan: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FeedbackQuestionCreateOrConnectWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionCreateOrConnectWithoutFeedbackAnswerInput> = z.object({
  where: z.lazy(() => FeedbackQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackQuestionCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackQuestionUncheckedCreateWithoutFeedbackAnswerInputSchema) ]),
}).strict();

export const FeedbackUpsertWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackUpsertWithoutFeedbackAnswerInput> = z.object({
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutFeedbackAnswerInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutFeedbackAnswerInputSchema) ]),
}).strict();

export const FeedbackUpdateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutFeedbackAnswerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFeedbackNestedInputSchema).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutFeedbackAnswerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackQuestionUpsertWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionUpsertWithoutFeedbackAnswerInput> = z.object({
  update: z.union([ z.lazy(() => FeedbackQuestionUpdateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackQuestionUncheckedUpdateWithoutFeedbackAnswerInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackQuestionCreateWithoutFeedbackAnswerInputSchema),z.lazy(() => FeedbackQuestionUncheckedCreateWithoutFeedbackAnswerInputSchema) ]),
}).strict();

export const FeedbackQuestionUpdateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionUpdateWithoutFeedbackAnswerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pertanyaan: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackQuestionUncheckedUpdateWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackQuestionUncheckedUpdateWithoutFeedbackAnswerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pertanyaan: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackAnswerCreateWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateWithoutQuestionInput> = z.object({
  id: z.string().optional(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutFeedbackAnswerInputSchema),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedCreateWithoutQuestionInput> = z.object({
  id: z.string().optional(),
  feedbackId: z.string(),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerCreateOrConnectWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateOrConnectWithoutQuestionInput> = z.object({
  where: z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const FeedbackAnswerCreateManyQuestionInputEnvelopeSchema: z.ZodType<Prisma.FeedbackAnswerCreateManyQuestionInputEnvelope> = z.object({
  data: z.lazy(() => FeedbackAnswerCreateManyQuestionInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUpsertWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackAnswerUpdateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedUpdateWithoutQuestionInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackAnswerCreateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const FeedbackAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => FeedbackAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackAnswerUpdateWithoutQuestionInputSchema),z.lazy(() => FeedbackAnswerUncheckedUpdateWithoutQuestionInputSchema) ]),
}).strict();

export const FeedbackAnswerUpdateManyWithWhereWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateManyWithWhereWithoutQuestionInput> = z.object({
  where: z.lazy(() => FeedbackAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackAnswerUpdateManyMutationInputSchema),z.lazy(() => FeedbackAnswerUncheckedUpdateManyWithoutFeedbackAnswerInputSchema) ]),
}).strict();

export const UserCreateWithoutContohImageInputSchema: z.ZodType<Prisma.UserCreateWithoutContohImageInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  Feedback: z.lazy(() => FeedbackCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutContohImageInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutContohImageInput> = z.object({
  id: z.string().optional(),
  nama: z.string(),
  email: z.string(),
  hp: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedCreateNestedManyWithoutPenerimaInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional(),
  Feedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutContohImageInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutContohImageInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutContohImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutContohImageInputSchema) ]),
}).strict();

export const UserUpsertWithoutContohImageInputSchema: z.ZodType<Prisma.UserUpsertWithoutContohImageInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutContohImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutContohImageInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutContohImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutContohImageInputSchema) ]),
}).strict();

export const UserUpdateWithoutContohImageInputSchema: z.ZodType<Prisma.UserUpdateWithoutContohImageInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutContohImageInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutContohImageInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  blastMarketing: z.lazy(() => BlastMarketingUncheckedUpdateManyWithoutPenerimaNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BookingCreateManyUserInputSchema: z.ZodType<Prisma.BookingCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const ChatRoomCreateManyAdminInputSchema: z.ZodType<Prisma.ChatRoomCreateManyAdminInput> = z.object({
  Id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatRoomCreateManyUserInputSchema: z.ZodType<Prisma.ChatRoomCreateManyUserInput> = z.object({
  Id: z.string().cuid().optional(),
  adminId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ContohImageCreateManyUserInputSchema: z.ZodType<Prisma.ContohImageCreateManyUserInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FeedbackCreateManyUserInputSchema: z.ZodType<Prisma.FeedbackCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  isiFeedback: z.string(),
  namaPenulis: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserCreateManyUserInputSchema: z.ZodType<Prisma.FotoUserCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  bookingId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BookingUpdateWithoutUserInputSchema: z.ZodType<Prisma.BookingUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  background: z.lazy(() => BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalog: z.lazy(() => KatalogUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  kupon: z.lazy(() => KuponUpdateOneWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutBookingInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutBookingInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingUpdateWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUpdateWithoutPenerimaInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingUncheckedUpdateWithoutPenerimaInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedUpdateWithoutPenerimaInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlastMarketingUncheckedUpdateManyWithoutBlastMarketingInputSchema: z.ZodType<Prisma.BlastMarketingUncheckedUpdateManyWithoutBlastMarketingInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subjek: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUpdateWithoutAdminInput> = z.object({
  Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutChatRoomUserNestedInputSchema).optional(),
  Chat: z.lazy(() => ChatUpdateManyWithoutChatRoomNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateWithoutAdminInput> = z.object({
  Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Chat: z.lazy(() => ChatUncheckedUpdateManyWithoutChatRoomNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateManyWithoutChatRoomAdminInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateManyWithoutChatRoomAdminInput> = z.object({
  Id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUpdateWithoutUserInput> = z.object({
  Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => UserUpdateOneRequiredWithoutChatRoomAdminNestedInputSchema).optional(),
  Chat: z.lazy(() => ChatUpdateManyWithoutChatRoomNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateWithoutUserInput> = z.object({
  Id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Chat: z.lazy(() => ChatUncheckedUpdateManyWithoutChatRoomNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatRoomUncheckedUpdateManyWithoutChatRoomUserInputSchema: z.ZodType<Prisma.ChatRoomUncheckedUpdateManyWithoutChatRoomUserInput> = z.object({
  Id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohImageUpdateWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohImageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ContohImageUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContohImageUncheckedUpdateManyWithoutContohImageInputSchema: z.ZodType<Prisma.ContohImageUncheckedUpdateManyWithoutContohImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUpdateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerUpdateManyWithoutFeedbackNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackAnswer: z.lazy(() => FeedbackAnswerUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutFeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isiFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namaPenulis: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUpdateWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneRequiredWithoutFotoUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateManyWithoutFotoUserInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateManyWithoutFotoUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookingId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateManyKatalogInputSchema: z.ZodType<Prisma.BookingCreateManyKatalogInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUpdateWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUpdateWithoutKatalogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  background: z.lazy(() => BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kupon: z.lazy(() => KuponUpdateOneWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateWithoutKatalogInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutKatalogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateManyKuponInputSchema: z.ZodType<Prisma.BookingCreateManyKuponInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  backgroundWarna: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalogId: z.string(),
  status: z.lazy(() => BookinStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUpdateWithoutKuponInputSchema: z.ZodType<Prisma.BookingUpdateWithoutKuponInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  background: z.lazy(() => BackgroundFotoUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalog: z.lazy(() => KatalogUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateWithoutKuponInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutKuponInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backgroundWarna: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateManyBackgroundInputSchema: z.ZodType<Prisma.BookingCreateManyBackgroundInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  peliharaan: z.boolean().optional(),
  harga: z.number().int(),
  jadwal: z.coerce.date(),
  durasi: z.number().int(),
  jumlahOrang: z.number().int(),
  katalogId: z.string(),
  kuponId: z.string().optional().nullable(),
  status: z.lazy(() => BookinStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deleted: z.boolean().optional()
}).strict();

export const BookingUpdateWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUpdateWithoutBackgroundInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalog: z.lazy(() => KatalogUpdateOneRequiredWithoutBookingNestedInputSchema).optional(),
  kupon: z.lazy(() => KuponUpdateOneWithoutBookingNestedInputSchema).optional(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateWithoutBackgroundInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutBackgroundInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  peliharaan: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  harga: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jadwal: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durasi: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jumlahOrang: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  katalogId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  kuponId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookinStatusSchema),z.lazy(() => EnumBookinStatusFieldUpdateOperationsInputSchema) ]).optional(),
  Pembayaran: z.lazy(() => PembayaranUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  fotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutBookingNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranCreateManyBookingInputSchema: z.ZodType<Prisma.PembayaranCreateManyBookingInput> = z.object({
  id: z.string().cuid().optional(),
  dp: z.boolean(),
  jumlah: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FotoUserCreateManyBookingInputSchema: z.ZodType<Prisma.FotoUserCreateManyBookingInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PembayaranUpdateWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.PembayaranUncheckedUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PembayaranUncheckedUpdateManyWithoutPembayaranInputSchema: z.ZodType<Prisma.PembayaranUncheckedUpdateManyWithoutPembayaranInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jumlah: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUpdateWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFotoUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FotoUserUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.FotoUserUncheckedUpdateWithoutBookingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogCreateManyKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogCreateManyKontenBlogInput> = z.object({
  id: z.string().cuid().optional(),
  nama: z.string(),
  isi: z.string(),
  like: z.number().int(),
  dislike: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CommentBlogUpdateWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUpdateWithoutKontenBlogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogUncheckedUpdateWithoutKontenBlogInputSchema: z.ZodType<Prisma.CommentBlogUncheckedUpdateWithoutKontenBlogInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentBlogUncheckedUpdateManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentBlogUncheckedUpdateManyWithoutCommentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isi: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dislike: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUpdateWithoutBlastMarketingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateManyWithoutUserNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBlastMarketingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBlastMarketingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatRoomAdmin: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  chatRoomUser: z.lazy(() => ChatRoomUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContohImage: z.lazy(() => ContohImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Feedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  FotoUser: z.lazy(() => FotoUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutPenerimaInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPenerimaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nama: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatCreateManyChatRoomInputSchema: z.ZodType<Prisma.ChatCreateManyChatRoomInput> = z.object({
  id: z.string().cuid().optional(),
  chat: z.string(),
  adminSend: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatUpdateWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUpdateWithoutChatRoomInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatUncheckedUpdateWithoutChatRoomInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateWithoutChatRoomInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatUncheckedUpdateManyWithoutChatInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyWithoutChatInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chat: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminSend: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackAnswerCreateManyFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateManyFeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackQuestionId: z.string(),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => FeedbackQuestionUpdateOneRequiredWithoutFeedbackAnswerNestedInputSchema).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerUncheckedUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackQuestionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerUncheckedUpdateManyWithoutFeedbackAnswerInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateManyWithoutFeedbackAnswerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackQuestionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerCreateManyQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerCreateManyQuestionInput> = z.object({
  id: z.string().cuid().optional(),
  feedbackId: z.string(),
  answer: z.string().optional().nullable()
}).strict();

export const FeedbackAnswerUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackUpdateOneRequiredWithoutFeedbackAnswerNestedInputSchema).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackAnswerUncheckedUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.FeedbackAnswerUncheckedUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbackId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const KatalogFindFirstArgsSchema: z.ZodType<Prisma.KatalogFindFirstArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereInputSchema.optional(),
  orderBy: z.union([ KatalogOrderByWithRelationInputSchema.array(),KatalogOrderByWithRelationInputSchema ]).optional(),
  cursor: KatalogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KatalogScalarFieldEnumSchema.array().optional(),
}).strict()

export const KatalogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KatalogFindFirstOrThrowArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereInputSchema.optional(),
  orderBy: z.union([ KatalogOrderByWithRelationInputSchema.array(),KatalogOrderByWithRelationInputSchema ]).optional(),
  cursor: KatalogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KatalogScalarFieldEnumSchema.array().optional(),
}).strict()

export const KatalogFindManyArgsSchema: z.ZodType<Prisma.KatalogFindManyArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereInputSchema.optional(),
  orderBy: z.union([ KatalogOrderByWithRelationInputSchema.array(),KatalogOrderByWithRelationInputSchema ]).optional(),
  cursor: KatalogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KatalogScalarFieldEnumSchema.array().optional(),
}).strict()

export const KatalogAggregateArgsSchema: z.ZodType<Prisma.KatalogAggregateArgs> = z.object({
  where: KatalogWhereInputSchema.optional(),
  orderBy: z.union([ KatalogOrderByWithRelationInputSchema.array(),KatalogOrderByWithRelationInputSchema ]).optional(),
  cursor: KatalogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KatalogGroupByArgsSchema: z.ZodType<Prisma.KatalogGroupByArgs> = z.object({
  where: KatalogWhereInputSchema.optional(),
  orderBy: z.union([ KatalogOrderByWithAggregationInputSchema.array(),KatalogOrderByWithAggregationInputSchema ]).optional(),
  by: KatalogScalarFieldEnumSchema.array(),
  having: KatalogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KatalogFindUniqueArgsSchema: z.ZodType<Prisma.KatalogFindUniqueArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereUniqueInputSchema,
}).strict()

export const KatalogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KatalogFindUniqueOrThrowArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereUniqueInputSchema,
}).strict()

export const KuponFindFirstArgsSchema: z.ZodType<Prisma.KuponFindFirstArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereInputSchema.optional(),
  orderBy: z.union([ KuponOrderByWithRelationInputSchema.array(),KuponOrderByWithRelationInputSchema ]).optional(),
  cursor: KuponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KuponScalarFieldEnumSchema.array().optional(),
}).strict()

export const KuponFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KuponFindFirstOrThrowArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereInputSchema.optional(),
  orderBy: z.union([ KuponOrderByWithRelationInputSchema.array(),KuponOrderByWithRelationInputSchema ]).optional(),
  cursor: KuponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KuponScalarFieldEnumSchema.array().optional(),
}).strict()

export const KuponFindManyArgsSchema: z.ZodType<Prisma.KuponFindManyArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereInputSchema.optional(),
  orderBy: z.union([ KuponOrderByWithRelationInputSchema.array(),KuponOrderByWithRelationInputSchema ]).optional(),
  cursor: KuponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KuponScalarFieldEnumSchema.array().optional(),
}).strict()

export const KuponAggregateArgsSchema: z.ZodType<Prisma.KuponAggregateArgs> = z.object({
  where: KuponWhereInputSchema.optional(),
  orderBy: z.union([ KuponOrderByWithRelationInputSchema.array(),KuponOrderByWithRelationInputSchema ]).optional(),
  cursor: KuponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KuponGroupByArgsSchema: z.ZodType<Prisma.KuponGroupByArgs> = z.object({
  where: KuponWhereInputSchema.optional(),
  orderBy: z.union([ KuponOrderByWithAggregationInputSchema.array(),KuponOrderByWithAggregationInputSchema ]).optional(),
  by: KuponScalarFieldEnumSchema.array(),
  having: KuponScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KuponFindUniqueArgsSchema: z.ZodType<Prisma.KuponFindUniqueArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereUniqueInputSchema,
}).strict()

export const KuponFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KuponFindUniqueOrThrowArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereUniqueInputSchema,
}).strict()

export const BackgroundFotoFindFirstArgsSchema: z.ZodType<Prisma.BackgroundFotoFindFirstArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereInputSchema.optional(),
  orderBy: z.union([ BackgroundFotoOrderByWithRelationInputSchema.array(),BackgroundFotoOrderByWithRelationInputSchema ]).optional(),
  cursor: BackgroundFotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BackgroundFotoScalarFieldEnumSchema.array().optional(),
}).strict()

export const BackgroundFotoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BackgroundFotoFindFirstOrThrowArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereInputSchema.optional(),
  orderBy: z.union([ BackgroundFotoOrderByWithRelationInputSchema.array(),BackgroundFotoOrderByWithRelationInputSchema ]).optional(),
  cursor: BackgroundFotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BackgroundFotoScalarFieldEnumSchema.array().optional(),
}).strict()

export const BackgroundFotoFindManyArgsSchema: z.ZodType<Prisma.BackgroundFotoFindManyArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereInputSchema.optional(),
  orderBy: z.union([ BackgroundFotoOrderByWithRelationInputSchema.array(),BackgroundFotoOrderByWithRelationInputSchema ]).optional(),
  cursor: BackgroundFotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BackgroundFotoScalarFieldEnumSchema.array().optional(),
}).strict()

export const BackgroundFotoAggregateArgsSchema: z.ZodType<Prisma.BackgroundFotoAggregateArgs> = z.object({
  where: BackgroundFotoWhereInputSchema.optional(),
  orderBy: z.union([ BackgroundFotoOrderByWithRelationInputSchema.array(),BackgroundFotoOrderByWithRelationInputSchema ]).optional(),
  cursor: BackgroundFotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BackgroundFotoGroupByArgsSchema: z.ZodType<Prisma.BackgroundFotoGroupByArgs> = z.object({
  where: BackgroundFotoWhereInputSchema.optional(),
  orderBy: z.union([ BackgroundFotoOrderByWithAggregationInputSchema.array(),BackgroundFotoOrderByWithAggregationInputSchema ]).optional(),
  by: BackgroundFotoScalarFieldEnumSchema.array(),
  having: BackgroundFotoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BackgroundFotoFindUniqueArgsSchema: z.ZodType<Prisma.BackgroundFotoFindUniqueArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereUniqueInputSchema,
}).strict()

export const BackgroundFotoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BackgroundFotoFindUniqueOrThrowArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereUniqueInputSchema,
}).strict()

export const BookingFindFirstArgsSchema: z.ZodType<Prisma.BookingFindFirstArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookingScalarFieldEnumSchema.array().optional(),
}).strict()

export const BookingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BookingFindFirstOrThrowArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookingScalarFieldEnumSchema.array().optional(),
}).strict()

export const BookingFindManyArgsSchema: z.ZodType<Prisma.BookingFindManyArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookingScalarFieldEnumSchema.array().optional(),
}).strict()

export const BookingAggregateArgsSchema: z.ZodType<Prisma.BookingAggregateArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BookingGroupByArgsSchema: z.ZodType<Prisma.BookingGroupByArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithAggregationInputSchema.array(),BookingOrderByWithAggregationInputSchema ]).optional(),
  by: BookingScalarFieldEnumSchema.array(),
  having: BookingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BookingFindUniqueArgsSchema: z.ZodType<Prisma.BookingFindUniqueArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict()

export const BookingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BookingFindUniqueOrThrowArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict()

export const PembayaranFindFirstArgsSchema: z.ZodType<Prisma.PembayaranFindFirstArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereInputSchema.optional(),
  orderBy: z.union([ PembayaranOrderByWithRelationInputSchema.array(),PembayaranOrderByWithRelationInputSchema ]).optional(),
  cursor: PembayaranWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PembayaranScalarFieldEnumSchema.array().optional(),
}).strict()

export const PembayaranFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PembayaranFindFirstOrThrowArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereInputSchema.optional(),
  orderBy: z.union([ PembayaranOrderByWithRelationInputSchema.array(),PembayaranOrderByWithRelationInputSchema ]).optional(),
  cursor: PembayaranWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PembayaranScalarFieldEnumSchema.array().optional(),
}).strict()

export const PembayaranFindManyArgsSchema: z.ZodType<Prisma.PembayaranFindManyArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereInputSchema.optional(),
  orderBy: z.union([ PembayaranOrderByWithRelationInputSchema.array(),PembayaranOrderByWithRelationInputSchema ]).optional(),
  cursor: PembayaranWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PembayaranScalarFieldEnumSchema.array().optional(),
}).strict()

export const PembayaranAggregateArgsSchema: z.ZodType<Prisma.PembayaranAggregateArgs> = z.object({
  where: PembayaranWhereInputSchema.optional(),
  orderBy: z.union([ PembayaranOrderByWithRelationInputSchema.array(),PembayaranOrderByWithRelationInputSchema ]).optional(),
  cursor: PembayaranWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PembayaranGroupByArgsSchema: z.ZodType<Prisma.PembayaranGroupByArgs> = z.object({
  where: PembayaranWhereInputSchema.optional(),
  orderBy: z.union([ PembayaranOrderByWithAggregationInputSchema.array(),PembayaranOrderByWithAggregationInputSchema ]).optional(),
  by: PembayaranScalarFieldEnumSchema.array(),
  having: PembayaranScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PembayaranFindUniqueArgsSchema: z.ZodType<Prisma.PembayaranFindUniqueArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereUniqueInputSchema,
}).strict()

export const PembayaranFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PembayaranFindUniqueOrThrowArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereUniqueInputSchema,
}).strict()

export const FotoUserFindFirstArgsSchema: z.ZodType<Prisma.FotoUserFindFirstArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereInputSchema.optional(),
  orderBy: z.union([ FotoUserOrderByWithRelationInputSchema.array(),FotoUserOrderByWithRelationInputSchema ]).optional(),
  cursor: FotoUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FotoUserScalarFieldEnumSchema.array().optional(),
}).strict()

export const FotoUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FotoUserFindFirstOrThrowArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereInputSchema.optional(),
  orderBy: z.union([ FotoUserOrderByWithRelationInputSchema.array(),FotoUserOrderByWithRelationInputSchema ]).optional(),
  cursor: FotoUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FotoUserScalarFieldEnumSchema.array().optional(),
}).strict()

export const FotoUserFindManyArgsSchema: z.ZodType<Prisma.FotoUserFindManyArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereInputSchema.optional(),
  orderBy: z.union([ FotoUserOrderByWithRelationInputSchema.array(),FotoUserOrderByWithRelationInputSchema ]).optional(),
  cursor: FotoUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FotoUserScalarFieldEnumSchema.array().optional(),
}).strict()

export const FotoUserAggregateArgsSchema: z.ZodType<Prisma.FotoUserAggregateArgs> = z.object({
  where: FotoUserWhereInputSchema.optional(),
  orderBy: z.union([ FotoUserOrderByWithRelationInputSchema.array(),FotoUserOrderByWithRelationInputSchema ]).optional(),
  cursor: FotoUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FotoUserGroupByArgsSchema: z.ZodType<Prisma.FotoUserGroupByArgs> = z.object({
  where: FotoUserWhereInputSchema.optional(),
  orderBy: z.union([ FotoUserOrderByWithAggregationInputSchema.array(),FotoUserOrderByWithAggregationInputSchema ]).optional(),
  by: FotoUserScalarFieldEnumSchema.array(),
  having: FotoUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FotoUserFindUniqueArgsSchema: z.ZodType<Prisma.FotoUserFindUniqueArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereUniqueInputSchema,
}).strict()

export const FotoUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FotoUserFindUniqueOrThrowArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereUniqueInputSchema,
}).strict()

export const KontenBlogFindFirstArgsSchema: z.ZodType<Prisma.KontenBlogFindFirstArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereInputSchema.optional(),
  orderBy: z.union([ KontenBlogOrderByWithRelationInputSchema.array(),KontenBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: KontenBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KontenBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const KontenBlogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KontenBlogFindFirstOrThrowArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereInputSchema.optional(),
  orderBy: z.union([ KontenBlogOrderByWithRelationInputSchema.array(),KontenBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: KontenBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KontenBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const KontenBlogFindManyArgsSchema: z.ZodType<Prisma.KontenBlogFindManyArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereInputSchema.optional(),
  orderBy: z.union([ KontenBlogOrderByWithRelationInputSchema.array(),KontenBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: KontenBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KontenBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const KontenBlogAggregateArgsSchema: z.ZodType<Prisma.KontenBlogAggregateArgs> = z.object({
  where: KontenBlogWhereInputSchema.optional(),
  orderBy: z.union([ KontenBlogOrderByWithRelationInputSchema.array(),KontenBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: KontenBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KontenBlogGroupByArgsSchema: z.ZodType<Prisma.KontenBlogGroupByArgs> = z.object({
  where: KontenBlogWhereInputSchema.optional(),
  orderBy: z.union([ KontenBlogOrderByWithAggregationInputSchema.array(),KontenBlogOrderByWithAggregationInputSchema ]).optional(),
  by: KontenBlogScalarFieldEnumSchema.array(),
  having: KontenBlogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KontenBlogFindUniqueArgsSchema: z.ZodType<Prisma.KontenBlogFindUniqueArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereUniqueInputSchema,
}).strict()

export const KontenBlogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KontenBlogFindUniqueOrThrowArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereUniqueInputSchema,
}).strict()

export const GambarBlogFindFirstArgsSchema: z.ZodType<Prisma.GambarBlogFindFirstArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereInputSchema.optional(),
  orderBy: z.union([ GambarBlogOrderByWithRelationInputSchema.array(),GambarBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: GambarBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GambarBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const GambarBlogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GambarBlogFindFirstOrThrowArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereInputSchema.optional(),
  orderBy: z.union([ GambarBlogOrderByWithRelationInputSchema.array(),GambarBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: GambarBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GambarBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const GambarBlogFindManyArgsSchema: z.ZodType<Prisma.GambarBlogFindManyArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereInputSchema.optional(),
  orderBy: z.union([ GambarBlogOrderByWithRelationInputSchema.array(),GambarBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: GambarBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GambarBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const GambarBlogAggregateArgsSchema: z.ZodType<Prisma.GambarBlogAggregateArgs> = z.object({
  where: GambarBlogWhereInputSchema.optional(),
  orderBy: z.union([ GambarBlogOrderByWithRelationInputSchema.array(),GambarBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: GambarBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GambarBlogGroupByArgsSchema: z.ZodType<Prisma.GambarBlogGroupByArgs> = z.object({
  where: GambarBlogWhereInputSchema.optional(),
  orderBy: z.union([ GambarBlogOrderByWithAggregationInputSchema.array(),GambarBlogOrderByWithAggregationInputSchema ]).optional(),
  by: GambarBlogScalarFieldEnumSchema.array(),
  having: GambarBlogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GambarBlogFindUniqueArgsSchema: z.ZodType<Prisma.GambarBlogFindUniqueArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereUniqueInputSchema,
}).strict()

export const GambarBlogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GambarBlogFindUniqueOrThrowArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereUniqueInputSchema,
}).strict()

export const CommentBlogFindFirstArgsSchema: z.ZodType<Prisma.CommentBlogFindFirstArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereInputSchema.optional(),
  orderBy: z.union([ CommentBlogOrderByWithRelationInputSchema.array(),CommentBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentBlogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentBlogFindFirstOrThrowArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereInputSchema.optional(),
  orderBy: z.union([ CommentBlogOrderByWithRelationInputSchema.array(),CommentBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentBlogFindManyArgsSchema: z.ZodType<Prisma.CommentBlogFindManyArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereInputSchema.optional(),
  orderBy: z.union([ CommentBlogOrderByWithRelationInputSchema.array(),CommentBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentBlogScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentBlogAggregateArgsSchema: z.ZodType<Prisma.CommentBlogAggregateArgs> = z.object({
  where: CommentBlogWhereInputSchema.optional(),
  orderBy: z.union([ CommentBlogOrderByWithRelationInputSchema.array(),CommentBlogOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentBlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentBlogGroupByArgsSchema: z.ZodType<Prisma.CommentBlogGroupByArgs> = z.object({
  where: CommentBlogWhereInputSchema.optional(),
  orderBy: z.union([ CommentBlogOrderByWithAggregationInputSchema.array(),CommentBlogOrderByWithAggregationInputSchema ]).optional(),
  by: CommentBlogScalarFieldEnumSchema.array(),
  having: CommentBlogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentBlogFindUniqueArgsSchema: z.ZodType<Prisma.CommentBlogFindUniqueArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereUniqueInputSchema,
}).strict()

export const CommentBlogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentBlogFindUniqueOrThrowArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereUniqueInputSchema,
}).strict()

export const BlastMarketingFindFirstArgsSchema: z.ZodType<Prisma.BlastMarketingFindFirstArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereInputSchema.optional(),
  orderBy: z.union([ BlastMarketingOrderByWithRelationInputSchema.array(),BlastMarketingOrderByWithRelationInputSchema ]).optional(),
  cursor: BlastMarketingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BlastMarketingScalarFieldEnumSchema.array().optional(),
}).strict()

export const BlastMarketingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlastMarketingFindFirstOrThrowArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereInputSchema.optional(),
  orderBy: z.union([ BlastMarketingOrderByWithRelationInputSchema.array(),BlastMarketingOrderByWithRelationInputSchema ]).optional(),
  cursor: BlastMarketingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BlastMarketingScalarFieldEnumSchema.array().optional(),
}).strict()

export const BlastMarketingFindManyArgsSchema: z.ZodType<Prisma.BlastMarketingFindManyArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereInputSchema.optional(),
  orderBy: z.union([ BlastMarketingOrderByWithRelationInputSchema.array(),BlastMarketingOrderByWithRelationInputSchema ]).optional(),
  cursor: BlastMarketingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BlastMarketingScalarFieldEnumSchema.array().optional(),
}).strict()

export const BlastMarketingAggregateArgsSchema: z.ZodType<Prisma.BlastMarketingAggregateArgs> = z.object({
  where: BlastMarketingWhereInputSchema.optional(),
  orderBy: z.union([ BlastMarketingOrderByWithRelationInputSchema.array(),BlastMarketingOrderByWithRelationInputSchema ]).optional(),
  cursor: BlastMarketingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BlastMarketingGroupByArgsSchema: z.ZodType<Prisma.BlastMarketingGroupByArgs> = z.object({
  where: BlastMarketingWhereInputSchema.optional(),
  orderBy: z.union([ BlastMarketingOrderByWithAggregationInputSchema.array(),BlastMarketingOrderByWithAggregationInputSchema ]).optional(),
  by: BlastMarketingScalarFieldEnumSchema.array(),
  having: BlastMarketingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BlastMarketingFindUniqueArgsSchema: z.ZodType<Prisma.BlastMarketingFindUniqueArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereUniqueInputSchema,
}).strict()

export const BlastMarketingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlastMarketingFindUniqueOrThrowArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereUniqueInputSchema,
}).strict()

export const HomeFindFirstArgsSchema: z.ZodType<Prisma.HomeFindFirstArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereInputSchema.optional(),
  orderBy: z.union([ HomeOrderByWithRelationInputSchema.array(),HomeOrderByWithRelationInputSchema ]).optional(),
  cursor: HomeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HomeScalarFieldEnumSchema.array().optional(),
}).strict()

export const HomeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HomeFindFirstOrThrowArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereInputSchema.optional(),
  orderBy: z.union([ HomeOrderByWithRelationInputSchema.array(),HomeOrderByWithRelationInputSchema ]).optional(),
  cursor: HomeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HomeScalarFieldEnumSchema.array().optional(),
}).strict()

export const HomeFindManyArgsSchema: z.ZodType<Prisma.HomeFindManyArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereInputSchema.optional(),
  orderBy: z.union([ HomeOrderByWithRelationInputSchema.array(),HomeOrderByWithRelationInputSchema ]).optional(),
  cursor: HomeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HomeScalarFieldEnumSchema.array().optional(),
}).strict()

export const HomeAggregateArgsSchema: z.ZodType<Prisma.HomeAggregateArgs> = z.object({
  where: HomeWhereInputSchema.optional(),
  orderBy: z.union([ HomeOrderByWithRelationInputSchema.array(),HomeOrderByWithRelationInputSchema ]).optional(),
  cursor: HomeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HomeGroupByArgsSchema: z.ZodType<Prisma.HomeGroupByArgs> = z.object({
  where: HomeWhereInputSchema.optional(),
  orderBy: z.union([ HomeOrderByWithAggregationInputSchema.array(),HomeOrderByWithAggregationInputSchema ]).optional(),
  by: HomeScalarFieldEnumSchema.array(),
  having: HomeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HomeFindUniqueArgsSchema: z.ZodType<Prisma.HomeFindUniqueArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereUniqueInputSchema,
}).strict()

export const HomeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HomeFindUniqueOrThrowArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereUniqueInputSchema,
}).strict()

export const ChatRoomFindFirstArgsSchema: z.ZodType<Prisma.ChatRoomFindFirstArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereInputSchema.optional(),
  orderBy: z.union([ ChatRoomOrderByWithRelationInputSchema.array(),ChatRoomOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatRoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChatRoomScalarFieldEnumSchema.array().optional(),
}).strict()

export const ChatRoomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatRoomFindFirstOrThrowArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereInputSchema.optional(),
  orderBy: z.union([ ChatRoomOrderByWithRelationInputSchema.array(),ChatRoomOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatRoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChatRoomScalarFieldEnumSchema.array().optional(),
}).strict()

export const ChatRoomFindManyArgsSchema: z.ZodType<Prisma.ChatRoomFindManyArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereInputSchema.optional(),
  orderBy: z.union([ ChatRoomOrderByWithRelationInputSchema.array(),ChatRoomOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatRoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChatRoomScalarFieldEnumSchema.array().optional(),
}).strict()

export const ChatRoomAggregateArgsSchema: z.ZodType<Prisma.ChatRoomAggregateArgs> = z.object({
  where: ChatRoomWhereInputSchema.optional(),
  orderBy: z.union([ ChatRoomOrderByWithRelationInputSchema.array(),ChatRoomOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatRoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatRoomGroupByArgsSchema: z.ZodType<Prisma.ChatRoomGroupByArgs> = z.object({
  where: ChatRoomWhereInputSchema.optional(),
  orderBy: z.union([ ChatRoomOrderByWithAggregationInputSchema.array(),ChatRoomOrderByWithAggregationInputSchema ]).optional(),
  by: ChatRoomScalarFieldEnumSchema.array(),
  having: ChatRoomScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatRoomFindUniqueArgsSchema: z.ZodType<Prisma.ChatRoomFindUniqueArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereUniqueInputSchema,
}).strict()

export const ChatRoomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatRoomFindUniqueOrThrowArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereUniqueInputSchema,
}).strict()

export const ChatFindFirstArgsSchema: z.ZodType<Prisma.ChatFindFirstArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChatScalarFieldEnumSchema.array().optional(),
}).strict()

export const ChatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatFindFirstOrThrowArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChatScalarFieldEnumSchema.array().optional(),
}).strict()

export const ChatFindManyArgsSchema: z.ZodType<Prisma.ChatFindManyArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChatScalarFieldEnumSchema.array().optional(),
}).strict()

export const ChatAggregateArgsSchema: z.ZodType<Prisma.ChatAggregateArgs> = z.object({
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatGroupByArgsSchema: z.ZodType<Prisma.ChatGroupByArgs> = z.object({
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithAggregationInputSchema.array(),ChatOrderByWithAggregationInputSchema ]).optional(),
  by: ChatScalarFieldEnumSchema.array(),
  having: ChatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatFindUniqueArgsSchema: z.ZodType<Prisma.ChatFindUniqueArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
}).strict()

export const ChatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatFindUniqueOrThrowArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
}).strict()

export const FeedbackFindFirstArgsSchema: z.ZodType<Prisma.FeedbackFindFirstArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindFirstOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackFindManyArgsSchema: z.ZodType<Prisma.FeedbackFindManyArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackAggregateArgsSchema: z.ZodType<Prisma.FeedbackAggregateArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FeedbackGroupByArgsSchema: z.ZodType<Prisma.FeedbackGroupByArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithAggregationInputSchema.array(),FeedbackOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackScalarFieldEnumSchema.array(),
  having: FeedbackScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FeedbackFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict()

export const FeedbackFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict()

export const FeedbackAnswerFindFirstArgsSchema: z.ZodType<Prisma.FeedbackAnswerFindFirstArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackAnswerOrderByWithRelationInputSchema.array(),FeedbackAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackAnswerScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackAnswerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackAnswerFindFirstOrThrowArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackAnswerOrderByWithRelationInputSchema.array(),FeedbackAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackAnswerScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackAnswerFindManyArgsSchema: z.ZodType<Prisma.FeedbackAnswerFindManyArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackAnswerOrderByWithRelationInputSchema.array(),FeedbackAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackAnswerScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackAnswerAggregateArgsSchema: z.ZodType<Prisma.FeedbackAnswerAggregateArgs> = z.object({
  where: FeedbackAnswerWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackAnswerOrderByWithRelationInputSchema.array(),FeedbackAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FeedbackAnswerGroupByArgsSchema: z.ZodType<Prisma.FeedbackAnswerGroupByArgs> = z.object({
  where: FeedbackAnswerWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackAnswerOrderByWithAggregationInputSchema.array(),FeedbackAnswerOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackAnswerScalarFieldEnumSchema.array(),
  having: FeedbackAnswerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FeedbackAnswerFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackAnswerFindUniqueArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereUniqueInputSchema,
}).strict()

export const FeedbackAnswerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackAnswerFindUniqueOrThrowArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereUniqueInputSchema,
}).strict()

export const FeedbackQuestionFindFirstArgsSchema: z.ZodType<Prisma.FeedbackQuestionFindFirstArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackQuestionOrderByWithRelationInputSchema.array(),FeedbackQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackQuestionScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackQuestionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackQuestionFindFirstOrThrowArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackQuestionOrderByWithRelationInputSchema.array(),FeedbackQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackQuestionScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackQuestionFindManyArgsSchema: z.ZodType<Prisma.FeedbackQuestionFindManyArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackQuestionOrderByWithRelationInputSchema.array(),FeedbackQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FeedbackQuestionScalarFieldEnumSchema.array().optional(),
}).strict()

export const FeedbackQuestionAggregateArgsSchema: z.ZodType<Prisma.FeedbackQuestionAggregateArgs> = z.object({
  where: FeedbackQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackQuestionOrderByWithRelationInputSchema.array(),FeedbackQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FeedbackQuestionGroupByArgsSchema: z.ZodType<Prisma.FeedbackQuestionGroupByArgs> = z.object({
  where: FeedbackQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackQuestionOrderByWithAggregationInputSchema.array(),FeedbackQuestionOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackQuestionScalarFieldEnumSchema.array(),
  having: FeedbackQuestionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FeedbackQuestionFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackQuestionFindUniqueArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereUniqueInputSchema,
}).strict()

export const FeedbackQuestionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackQuestionFindUniqueOrThrowArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereUniqueInputSchema,
}).strict()

export const ContohFindFirstArgsSchema: z.ZodType<Prisma.ContohFindFirstArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereInputSchema.optional(),
  orderBy: z.union([ ContohOrderByWithRelationInputSchema.array(),ContohOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContohScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContohFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContohFindFirstOrThrowArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereInputSchema.optional(),
  orderBy: z.union([ ContohOrderByWithRelationInputSchema.array(),ContohOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContohScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContohFindManyArgsSchema: z.ZodType<Prisma.ContohFindManyArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereInputSchema.optional(),
  orderBy: z.union([ ContohOrderByWithRelationInputSchema.array(),ContohOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContohScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContohAggregateArgsSchema: z.ZodType<Prisma.ContohAggregateArgs> = z.object({
  where: ContohWhereInputSchema.optional(),
  orderBy: z.union([ ContohOrderByWithRelationInputSchema.array(),ContohOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContohGroupByArgsSchema: z.ZodType<Prisma.ContohGroupByArgs> = z.object({
  where: ContohWhereInputSchema.optional(),
  orderBy: z.union([ ContohOrderByWithAggregationInputSchema.array(),ContohOrderByWithAggregationInputSchema ]).optional(),
  by: ContohScalarFieldEnumSchema.array(),
  having: ContohScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContohFindUniqueArgsSchema: z.ZodType<Prisma.ContohFindUniqueArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereUniqueInputSchema,
}).strict()

export const ContohFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContohFindUniqueOrThrowArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereUniqueInputSchema,
}).strict()

export const ContohImageFindFirstArgsSchema: z.ZodType<Prisma.ContohImageFindFirstArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereInputSchema.optional(),
  orderBy: z.union([ ContohImageOrderByWithRelationInputSchema.array(),ContohImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContohImageScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContohImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContohImageFindFirstOrThrowArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereInputSchema.optional(),
  orderBy: z.union([ ContohImageOrderByWithRelationInputSchema.array(),ContohImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContohImageScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContohImageFindManyArgsSchema: z.ZodType<Prisma.ContohImageFindManyArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereInputSchema.optional(),
  orderBy: z.union([ ContohImageOrderByWithRelationInputSchema.array(),ContohImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContohImageScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContohImageAggregateArgsSchema: z.ZodType<Prisma.ContohImageAggregateArgs> = z.object({
  where: ContohImageWhereInputSchema.optional(),
  orderBy: z.union([ ContohImageOrderByWithRelationInputSchema.array(),ContohImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContohImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContohImageGroupByArgsSchema: z.ZodType<Prisma.ContohImageGroupByArgs> = z.object({
  where: ContohImageWhereInputSchema.optional(),
  orderBy: z.union([ ContohImageOrderByWithAggregationInputSchema.array(),ContohImageOrderByWithAggregationInputSchema ]).optional(),
  by: ContohImageScalarFieldEnumSchema.array(),
  having: ContohImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContohImageFindUniqueArgsSchema: z.ZodType<Prisma.ContohImageFindUniqueArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereUniqueInputSchema,
}).strict()

export const ContohImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContohImageFindUniqueOrThrowArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const KatalogCreateArgsSchema: z.ZodType<Prisma.KatalogCreateArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  data: z.union([ KatalogCreateInputSchema,KatalogUncheckedCreateInputSchema ]),
}).strict()

export const KatalogUpsertArgsSchema: z.ZodType<Prisma.KatalogUpsertArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereUniqueInputSchema,
  create: z.union([ KatalogCreateInputSchema,KatalogUncheckedCreateInputSchema ]),
  update: z.union([ KatalogUpdateInputSchema,KatalogUncheckedUpdateInputSchema ]),
}).strict()

export const KatalogCreateManyArgsSchema: z.ZodType<Prisma.KatalogCreateManyArgs> = z.object({
  data: KatalogCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const KatalogDeleteArgsSchema: z.ZodType<Prisma.KatalogDeleteArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  where: KatalogWhereUniqueInputSchema,
}).strict()

export const KatalogUpdateArgsSchema: z.ZodType<Prisma.KatalogUpdateArgs> = z.object({
  select: KatalogSelectSchema.optional(),
  include: KatalogIncludeSchema.optional(),
  data: z.union([ KatalogUpdateInputSchema,KatalogUncheckedUpdateInputSchema ]),
  where: KatalogWhereUniqueInputSchema,
}).strict()

export const KatalogUpdateManyArgsSchema: z.ZodType<Prisma.KatalogUpdateManyArgs> = z.object({
  data: z.union([ KatalogUpdateManyMutationInputSchema,KatalogUncheckedUpdateManyInputSchema ]),
  where: KatalogWhereInputSchema.optional(),
}).strict()

export const KatalogDeleteManyArgsSchema: z.ZodType<Prisma.KatalogDeleteManyArgs> = z.object({
  where: KatalogWhereInputSchema.optional(),
}).strict()

export const KuponCreateArgsSchema: z.ZodType<Prisma.KuponCreateArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  data: z.union([ KuponCreateInputSchema,KuponUncheckedCreateInputSchema ]),
}).strict()

export const KuponUpsertArgsSchema: z.ZodType<Prisma.KuponUpsertArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereUniqueInputSchema,
  create: z.union([ KuponCreateInputSchema,KuponUncheckedCreateInputSchema ]),
  update: z.union([ KuponUpdateInputSchema,KuponUncheckedUpdateInputSchema ]),
}).strict()

export const KuponCreateManyArgsSchema: z.ZodType<Prisma.KuponCreateManyArgs> = z.object({
  data: KuponCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const KuponDeleteArgsSchema: z.ZodType<Prisma.KuponDeleteArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  where: KuponWhereUniqueInputSchema,
}).strict()

export const KuponUpdateArgsSchema: z.ZodType<Prisma.KuponUpdateArgs> = z.object({
  select: KuponSelectSchema.optional(),
  include: KuponIncludeSchema.optional(),
  data: z.union([ KuponUpdateInputSchema,KuponUncheckedUpdateInputSchema ]),
  where: KuponWhereUniqueInputSchema,
}).strict()

export const KuponUpdateManyArgsSchema: z.ZodType<Prisma.KuponUpdateManyArgs> = z.object({
  data: z.union([ KuponUpdateManyMutationInputSchema,KuponUncheckedUpdateManyInputSchema ]),
  where: KuponWhereInputSchema.optional(),
}).strict()

export const KuponDeleteManyArgsSchema: z.ZodType<Prisma.KuponDeleteManyArgs> = z.object({
  where: KuponWhereInputSchema.optional(),
}).strict()

export const BackgroundFotoCreateArgsSchema: z.ZodType<Prisma.BackgroundFotoCreateArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  data: z.union([ BackgroundFotoCreateInputSchema,BackgroundFotoUncheckedCreateInputSchema ]),
}).strict()

export const BackgroundFotoUpsertArgsSchema: z.ZodType<Prisma.BackgroundFotoUpsertArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereUniqueInputSchema,
  create: z.union([ BackgroundFotoCreateInputSchema,BackgroundFotoUncheckedCreateInputSchema ]),
  update: z.union([ BackgroundFotoUpdateInputSchema,BackgroundFotoUncheckedUpdateInputSchema ]),
}).strict()

export const BackgroundFotoCreateManyArgsSchema: z.ZodType<Prisma.BackgroundFotoCreateManyArgs> = z.object({
  data: BackgroundFotoCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const BackgroundFotoDeleteArgsSchema: z.ZodType<Prisma.BackgroundFotoDeleteArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  where: BackgroundFotoWhereUniqueInputSchema,
}).strict()

export const BackgroundFotoUpdateArgsSchema: z.ZodType<Prisma.BackgroundFotoUpdateArgs> = z.object({
  select: BackgroundFotoSelectSchema.optional(),
  include: BackgroundFotoIncludeSchema.optional(),
  data: z.union([ BackgroundFotoUpdateInputSchema,BackgroundFotoUncheckedUpdateInputSchema ]),
  where: BackgroundFotoWhereUniqueInputSchema,
}).strict()

export const BackgroundFotoUpdateManyArgsSchema: z.ZodType<Prisma.BackgroundFotoUpdateManyArgs> = z.object({
  data: z.union([ BackgroundFotoUpdateManyMutationInputSchema,BackgroundFotoUncheckedUpdateManyInputSchema ]),
  where: BackgroundFotoWhereInputSchema.optional(),
}).strict()

export const BackgroundFotoDeleteManyArgsSchema: z.ZodType<Prisma.BackgroundFotoDeleteManyArgs> = z.object({
  where: BackgroundFotoWhereInputSchema.optional(),
}).strict()

export const BookingCreateArgsSchema: z.ZodType<Prisma.BookingCreateArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  data: z.union([ BookingCreateInputSchema,BookingUncheckedCreateInputSchema ]),
}).strict()

export const BookingUpsertArgsSchema: z.ZodType<Prisma.BookingUpsertArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
  create: z.union([ BookingCreateInputSchema,BookingUncheckedCreateInputSchema ]),
  update: z.union([ BookingUpdateInputSchema,BookingUncheckedUpdateInputSchema ]),
}).strict()

export const BookingCreateManyArgsSchema: z.ZodType<Prisma.BookingCreateManyArgs> = z.object({
  data: BookingCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const BookingDeleteArgsSchema: z.ZodType<Prisma.BookingDeleteArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict()

export const BookingUpdateArgsSchema: z.ZodType<Prisma.BookingUpdateArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  data: z.union([ BookingUpdateInputSchema,BookingUncheckedUpdateInputSchema ]),
  where: BookingWhereUniqueInputSchema,
}).strict()

export const BookingUpdateManyArgsSchema: z.ZodType<Prisma.BookingUpdateManyArgs> = z.object({
  data: z.union([ BookingUpdateManyMutationInputSchema,BookingUncheckedUpdateManyInputSchema ]),
  where: BookingWhereInputSchema.optional(),
}).strict()

export const BookingDeleteManyArgsSchema: z.ZodType<Prisma.BookingDeleteManyArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
}).strict()

export const PembayaranCreateArgsSchema: z.ZodType<Prisma.PembayaranCreateArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  data: z.union([ PembayaranCreateInputSchema,PembayaranUncheckedCreateInputSchema ]),
}).strict()

export const PembayaranUpsertArgsSchema: z.ZodType<Prisma.PembayaranUpsertArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereUniqueInputSchema,
  create: z.union([ PembayaranCreateInputSchema,PembayaranUncheckedCreateInputSchema ]),
  update: z.union([ PembayaranUpdateInputSchema,PembayaranUncheckedUpdateInputSchema ]),
}).strict()

export const PembayaranCreateManyArgsSchema: z.ZodType<Prisma.PembayaranCreateManyArgs> = z.object({
  data: PembayaranCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PembayaranDeleteArgsSchema: z.ZodType<Prisma.PembayaranDeleteArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  where: PembayaranWhereUniqueInputSchema,
}).strict()

export const PembayaranUpdateArgsSchema: z.ZodType<Prisma.PembayaranUpdateArgs> = z.object({
  select: PembayaranSelectSchema.optional(),
  include: PembayaranIncludeSchema.optional(),
  data: z.union([ PembayaranUpdateInputSchema,PembayaranUncheckedUpdateInputSchema ]),
  where: PembayaranWhereUniqueInputSchema,
}).strict()

export const PembayaranUpdateManyArgsSchema: z.ZodType<Prisma.PembayaranUpdateManyArgs> = z.object({
  data: z.union([ PembayaranUpdateManyMutationInputSchema,PembayaranUncheckedUpdateManyInputSchema ]),
  where: PembayaranWhereInputSchema.optional(),
}).strict()

export const PembayaranDeleteManyArgsSchema: z.ZodType<Prisma.PembayaranDeleteManyArgs> = z.object({
  where: PembayaranWhereInputSchema.optional(),
}).strict()

export const FotoUserCreateArgsSchema: z.ZodType<Prisma.FotoUserCreateArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  data: z.union([ FotoUserCreateInputSchema,FotoUserUncheckedCreateInputSchema ]),
}).strict()

export const FotoUserUpsertArgsSchema: z.ZodType<Prisma.FotoUserUpsertArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereUniqueInputSchema,
  create: z.union([ FotoUserCreateInputSchema,FotoUserUncheckedCreateInputSchema ]),
  update: z.union([ FotoUserUpdateInputSchema,FotoUserUncheckedUpdateInputSchema ]),
}).strict()

export const FotoUserCreateManyArgsSchema: z.ZodType<Prisma.FotoUserCreateManyArgs> = z.object({
  data: FotoUserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FotoUserDeleteArgsSchema: z.ZodType<Prisma.FotoUserDeleteArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  where: FotoUserWhereUniqueInputSchema,
}).strict()

export const FotoUserUpdateArgsSchema: z.ZodType<Prisma.FotoUserUpdateArgs> = z.object({
  select: FotoUserSelectSchema.optional(),
  include: FotoUserIncludeSchema.optional(),
  data: z.union([ FotoUserUpdateInputSchema,FotoUserUncheckedUpdateInputSchema ]),
  where: FotoUserWhereUniqueInputSchema,
}).strict()

export const FotoUserUpdateManyArgsSchema: z.ZodType<Prisma.FotoUserUpdateManyArgs> = z.object({
  data: z.union([ FotoUserUpdateManyMutationInputSchema,FotoUserUncheckedUpdateManyInputSchema ]),
  where: FotoUserWhereInputSchema.optional(),
}).strict()

export const FotoUserDeleteManyArgsSchema: z.ZodType<Prisma.FotoUserDeleteManyArgs> = z.object({
  where: FotoUserWhereInputSchema.optional(),
}).strict()

export const KontenBlogCreateArgsSchema: z.ZodType<Prisma.KontenBlogCreateArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  data: z.union([ KontenBlogCreateInputSchema,KontenBlogUncheckedCreateInputSchema ]),
}).strict()

export const KontenBlogUpsertArgsSchema: z.ZodType<Prisma.KontenBlogUpsertArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereUniqueInputSchema,
  create: z.union([ KontenBlogCreateInputSchema,KontenBlogUncheckedCreateInputSchema ]),
  update: z.union([ KontenBlogUpdateInputSchema,KontenBlogUncheckedUpdateInputSchema ]),
}).strict()

export const KontenBlogCreateManyArgsSchema: z.ZodType<Prisma.KontenBlogCreateManyArgs> = z.object({
  data: KontenBlogCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const KontenBlogDeleteArgsSchema: z.ZodType<Prisma.KontenBlogDeleteArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  where: KontenBlogWhereUniqueInputSchema,
}).strict()

export const KontenBlogUpdateArgsSchema: z.ZodType<Prisma.KontenBlogUpdateArgs> = z.object({
  select: KontenBlogSelectSchema.optional(),
  include: KontenBlogIncludeSchema.optional(),
  data: z.union([ KontenBlogUpdateInputSchema,KontenBlogUncheckedUpdateInputSchema ]),
  where: KontenBlogWhereUniqueInputSchema,
}).strict()

export const KontenBlogUpdateManyArgsSchema: z.ZodType<Prisma.KontenBlogUpdateManyArgs> = z.object({
  data: z.union([ KontenBlogUpdateManyMutationInputSchema,KontenBlogUncheckedUpdateManyInputSchema ]),
  where: KontenBlogWhereInputSchema.optional(),
}).strict()

export const KontenBlogDeleteManyArgsSchema: z.ZodType<Prisma.KontenBlogDeleteManyArgs> = z.object({
  where: KontenBlogWhereInputSchema.optional(),
}).strict()

export const GambarBlogCreateArgsSchema: z.ZodType<Prisma.GambarBlogCreateArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  data: z.union([ GambarBlogCreateInputSchema,GambarBlogUncheckedCreateInputSchema ]),
}).strict()

export const GambarBlogUpsertArgsSchema: z.ZodType<Prisma.GambarBlogUpsertArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereUniqueInputSchema,
  create: z.union([ GambarBlogCreateInputSchema,GambarBlogUncheckedCreateInputSchema ]),
  update: z.union([ GambarBlogUpdateInputSchema,GambarBlogUncheckedUpdateInputSchema ]),
}).strict()

export const GambarBlogCreateManyArgsSchema: z.ZodType<Prisma.GambarBlogCreateManyArgs> = z.object({
  data: GambarBlogCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const GambarBlogDeleteArgsSchema: z.ZodType<Prisma.GambarBlogDeleteArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  where: GambarBlogWhereUniqueInputSchema,
}).strict()

export const GambarBlogUpdateArgsSchema: z.ZodType<Prisma.GambarBlogUpdateArgs> = z.object({
  select: GambarBlogSelectSchema.optional(),
  include: GambarBlogIncludeSchema.optional(),
  data: z.union([ GambarBlogUpdateInputSchema,GambarBlogUncheckedUpdateInputSchema ]),
  where: GambarBlogWhereUniqueInputSchema,
}).strict()

export const GambarBlogUpdateManyArgsSchema: z.ZodType<Prisma.GambarBlogUpdateManyArgs> = z.object({
  data: z.union([ GambarBlogUpdateManyMutationInputSchema,GambarBlogUncheckedUpdateManyInputSchema ]),
  where: GambarBlogWhereInputSchema.optional(),
}).strict()

export const GambarBlogDeleteManyArgsSchema: z.ZodType<Prisma.GambarBlogDeleteManyArgs> = z.object({
  where: GambarBlogWhereInputSchema.optional(),
}).strict()

export const CommentBlogCreateArgsSchema: z.ZodType<Prisma.CommentBlogCreateArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  data: z.union([ CommentBlogCreateInputSchema,CommentBlogUncheckedCreateInputSchema ]),
}).strict()

export const CommentBlogUpsertArgsSchema: z.ZodType<Prisma.CommentBlogUpsertArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereUniqueInputSchema,
  create: z.union([ CommentBlogCreateInputSchema,CommentBlogUncheckedCreateInputSchema ]),
  update: z.union([ CommentBlogUpdateInputSchema,CommentBlogUncheckedUpdateInputSchema ]),
}).strict()

export const CommentBlogCreateManyArgsSchema: z.ZodType<Prisma.CommentBlogCreateManyArgs> = z.object({
  data: CommentBlogCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CommentBlogDeleteArgsSchema: z.ZodType<Prisma.CommentBlogDeleteArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  where: CommentBlogWhereUniqueInputSchema,
}).strict()

export const CommentBlogUpdateArgsSchema: z.ZodType<Prisma.CommentBlogUpdateArgs> = z.object({
  select: CommentBlogSelectSchema.optional(),
  include: CommentBlogIncludeSchema.optional(),
  data: z.union([ CommentBlogUpdateInputSchema,CommentBlogUncheckedUpdateInputSchema ]),
  where: CommentBlogWhereUniqueInputSchema,
}).strict()

export const CommentBlogUpdateManyArgsSchema: z.ZodType<Prisma.CommentBlogUpdateManyArgs> = z.object({
  data: z.union([ CommentBlogUpdateManyMutationInputSchema,CommentBlogUncheckedUpdateManyInputSchema ]),
  where: CommentBlogWhereInputSchema.optional(),
}).strict()

export const CommentBlogDeleteManyArgsSchema: z.ZodType<Prisma.CommentBlogDeleteManyArgs> = z.object({
  where: CommentBlogWhereInputSchema.optional(),
}).strict()

export const BlastMarketingCreateArgsSchema: z.ZodType<Prisma.BlastMarketingCreateArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  data: z.union([ BlastMarketingCreateInputSchema,BlastMarketingUncheckedCreateInputSchema ]),
}).strict()

export const BlastMarketingUpsertArgsSchema: z.ZodType<Prisma.BlastMarketingUpsertArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereUniqueInputSchema,
  create: z.union([ BlastMarketingCreateInputSchema,BlastMarketingUncheckedCreateInputSchema ]),
  update: z.union([ BlastMarketingUpdateInputSchema,BlastMarketingUncheckedUpdateInputSchema ]),
}).strict()

export const BlastMarketingCreateManyArgsSchema: z.ZodType<Prisma.BlastMarketingCreateManyArgs> = z.object({
  data: BlastMarketingCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const BlastMarketingDeleteArgsSchema: z.ZodType<Prisma.BlastMarketingDeleteArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  where: BlastMarketingWhereUniqueInputSchema,
}).strict()

export const BlastMarketingUpdateArgsSchema: z.ZodType<Prisma.BlastMarketingUpdateArgs> = z.object({
  select: BlastMarketingSelectSchema.optional(),
  include: BlastMarketingIncludeSchema.optional(),
  data: z.union([ BlastMarketingUpdateInputSchema,BlastMarketingUncheckedUpdateInputSchema ]),
  where: BlastMarketingWhereUniqueInputSchema,
}).strict()

export const BlastMarketingUpdateManyArgsSchema: z.ZodType<Prisma.BlastMarketingUpdateManyArgs> = z.object({
  data: z.union([ BlastMarketingUpdateManyMutationInputSchema,BlastMarketingUncheckedUpdateManyInputSchema ]),
  where: BlastMarketingWhereInputSchema.optional(),
}).strict()

export const BlastMarketingDeleteManyArgsSchema: z.ZodType<Prisma.BlastMarketingDeleteManyArgs> = z.object({
  where: BlastMarketingWhereInputSchema.optional(),
}).strict()

export const HomeCreateArgsSchema: z.ZodType<Prisma.HomeCreateArgs> = z.object({
  select: HomeSelectSchema.optional(),
  data: z.union([ HomeCreateInputSchema,HomeUncheckedCreateInputSchema ]),
}).strict()

export const HomeUpsertArgsSchema: z.ZodType<Prisma.HomeUpsertArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereUniqueInputSchema,
  create: z.union([ HomeCreateInputSchema,HomeUncheckedCreateInputSchema ]),
  update: z.union([ HomeUpdateInputSchema,HomeUncheckedUpdateInputSchema ]),
}).strict()

export const HomeCreateManyArgsSchema: z.ZodType<Prisma.HomeCreateManyArgs> = z.object({
  data: HomeCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HomeDeleteArgsSchema: z.ZodType<Prisma.HomeDeleteArgs> = z.object({
  select: HomeSelectSchema.optional(),
  where: HomeWhereUniqueInputSchema,
}).strict()

export const HomeUpdateArgsSchema: z.ZodType<Prisma.HomeUpdateArgs> = z.object({
  select: HomeSelectSchema.optional(),
  data: z.union([ HomeUpdateInputSchema,HomeUncheckedUpdateInputSchema ]),
  where: HomeWhereUniqueInputSchema,
}).strict()

export const HomeUpdateManyArgsSchema: z.ZodType<Prisma.HomeUpdateManyArgs> = z.object({
  data: z.union([ HomeUpdateManyMutationInputSchema,HomeUncheckedUpdateManyInputSchema ]),
  where: HomeWhereInputSchema.optional(),
}).strict()

export const HomeDeleteManyArgsSchema: z.ZodType<Prisma.HomeDeleteManyArgs> = z.object({
  where: HomeWhereInputSchema.optional(),
}).strict()

export const ChatRoomCreateArgsSchema: z.ZodType<Prisma.ChatRoomCreateArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  data: z.union([ ChatRoomCreateInputSchema,ChatRoomUncheckedCreateInputSchema ]),
}).strict()

export const ChatRoomUpsertArgsSchema: z.ZodType<Prisma.ChatRoomUpsertArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereUniqueInputSchema,
  create: z.union([ ChatRoomCreateInputSchema,ChatRoomUncheckedCreateInputSchema ]),
  update: z.union([ ChatRoomUpdateInputSchema,ChatRoomUncheckedUpdateInputSchema ]),
}).strict()

export const ChatRoomCreateManyArgsSchema: z.ZodType<Prisma.ChatRoomCreateManyArgs> = z.object({
  data: ChatRoomCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ChatRoomDeleteArgsSchema: z.ZodType<Prisma.ChatRoomDeleteArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  where: ChatRoomWhereUniqueInputSchema,
}).strict()

export const ChatRoomUpdateArgsSchema: z.ZodType<Prisma.ChatRoomUpdateArgs> = z.object({
  select: ChatRoomSelectSchema.optional(),
  include: ChatRoomIncludeSchema.optional(),
  data: z.union([ ChatRoomUpdateInputSchema,ChatRoomUncheckedUpdateInputSchema ]),
  where: ChatRoomWhereUniqueInputSchema,
}).strict()

export const ChatRoomUpdateManyArgsSchema: z.ZodType<Prisma.ChatRoomUpdateManyArgs> = z.object({
  data: z.union([ ChatRoomUpdateManyMutationInputSchema,ChatRoomUncheckedUpdateManyInputSchema ]),
  where: ChatRoomWhereInputSchema.optional(),
}).strict()

export const ChatRoomDeleteManyArgsSchema: z.ZodType<Prisma.ChatRoomDeleteManyArgs> = z.object({
  where: ChatRoomWhereInputSchema.optional(),
}).strict()

export const ChatCreateArgsSchema: z.ZodType<Prisma.ChatCreateArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  data: z.union([ ChatCreateInputSchema,ChatUncheckedCreateInputSchema ]),
}).strict()

export const ChatUpsertArgsSchema: z.ZodType<Prisma.ChatUpsertArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
  create: z.union([ ChatCreateInputSchema,ChatUncheckedCreateInputSchema ]),
  update: z.union([ ChatUpdateInputSchema,ChatUncheckedUpdateInputSchema ]),
}).strict()

export const ChatCreateManyArgsSchema: z.ZodType<Prisma.ChatCreateManyArgs> = z.object({
  data: ChatCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ChatDeleteArgsSchema: z.ZodType<Prisma.ChatDeleteArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
}).strict()

export const ChatUpdateArgsSchema: z.ZodType<Prisma.ChatUpdateArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  data: z.union([ ChatUpdateInputSchema,ChatUncheckedUpdateInputSchema ]),
  where: ChatWhereUniqueInputSchema,
}).strict()

export const ChatUpdateManyArgsSchema: z.ZodType<Prisma.ChatUpdateManyArgs> = z.object({
  data: z.union([ ChatUpdateManyMutationInputSchema,ChatUncheckedUpdateManyInputSchema ]),
  where: ChatWhereInputSchema.optional(),
}).strict()

export const ChatDeleteManyArgsSchema: z.ZodType<Prisma.ChatDeleteManyArgs> = z.object({
  where: ChatWhereInputSchema.optional(),
}).strict()

export const FeedbackCreateArgsSchema: z.ZodType<Prisma.FeedbackCreateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
}).strict()

export const FeedbackUpsertArgsSchema: z.ZodType<Prisma.FeedbackUpsertArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
  create: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
}).strict()

export const FeedbackCreateManyArgsSchema: z.ZodType<Prisma.FeedbackCreateManyArgs> = z.object({
  data: FeedbackCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FeedbackDeleteArgsSchema: z.ZodType<Prisma.FeedbackDeleteArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict()

export const FeedbackUpdateArgsSchema: z.ZodType<Prisma.FeedbackUpdateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
  where: FeedbackWhereUniqueInputSchema,
}).strict()

export const FeedbackUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackUpdateManyArgs> = z.object({
  data: z.union([ FeedbackUpdateManyMutationInputSchema,FeedbackUncheckedUpdateManyInputSchema ]),
  where: FeedbackWhereInputSchema.optional(),
}).strict()

export const FeedbackDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackDeleteManyArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
}).strict()

export const FeedbackAnswerCreateArgsSchema: z.ZodType<Prisma.FeedbackAnswerCreateArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  data: z.union([ FeedbackAnswerCreateInputSchema,FeedbackAnswerUncheckedCreateInputSchema ]),
}).strict()

export const FeedbackAnswerUpsertArgsSchema: z.ZodType<Prisma.FeedbackAnswerUpsertArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereUniqueInputSchema,
  create: z.union([ FeedbackAnswerCreateInputSchema,FeedbackAnswerUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackAnswerUpdateInputSchema,FeedbackAnswerUncheckedUpdateInputSchema ]),
}).strict()

export const FeedbackAnswerCreateManyArgsSchema: z.ZodType<Prisma.FeedbackAnswerCreateManyArgs> = z.object({
  data: FeedbackAnswerCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FeedbackAnswerDeleteArgsSchema: z.ZodType<Prisma.FeedbackAnswerDeleteArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  where: FeedbackAnswerWhereUniqueInputSchema,
}).strict()

export const FeedbackAnswerUpdateArgsSchema: z.ZodType<Prisma.FeedbackAnswerUpdateArgs> = z.object({
  select: FeedbackAnswerSelectSchema.optional(),
  include: FeedbackAnswerIncludeSchema.optional(),
  data: z.union([ FeedbackAnswerUpdateInputSchema,FeedbackAnswerUncheckedUpdateInputSchema ]),
  where: FeedbackAnswerWhereUniqueInputSchema,
}).strict()

export const FeedbackAnswerUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackAnswerUpdateManyArgs> = z.object({
  data: z.union([ FeedbackAnswerUpdateManyMutationInputSchema,FeedbackAnswerUncheckedUpdateManyInputSchema ]),
  where: FeedbackAnswerWhereInputSchema.optional(),
}).strict()

export const FeedbackAnswerDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackAnswerDeleteManyArgs> = z.object({
  where: FeedbackAnswerWhereInputSchema.optional(),
}).strict()

export const FeedbackQuestionCreateArgsSchema: z.ZodType<Prisma.FeedbackQuestionCreateArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  data: z.union([ FeedbackQuestionCreateInputSchema,FeedbackQuestionUncheckedCreateInputSchema ]),
}).strict()

export const FeedbackQuestionUpsertArgsSchema: z.ZodType<Prisma.FeedbackQuestionUpsertArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereUniqueInputSchema,
  create: z.union([ FeedbackQuestionCreateInputSchema,FeedbackQuestionUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackQuestionUpdateInputSchema,FeedbackQuestionUncheckedUpdateInputSchema ]),
}).strict()

export const FeedbackQuestionCreateManyArgsSchema: z.ZodType<Prisma.FeedbackQuestionCreateManyArgs> = z.object({
  data: FeedbackQuestionCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FeedbackQuestionDeleteArgsSchema: z.ZodType<Prisma.FeedbackQuestionDeleteArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  where: FeedbackQuestionWhereUniqueInputSchema,
}).strict()

export const FeedbackQuestionUpdateArgsSchema: z.ZodType<Prisma.FeedbackQuestionUpdateArgs> = z.object({
  select: FeedbackQuestionSelectSchema.optional(),
  include: FeedbackQuestionIncludeSchema.optional(),
  data: z.union([ FeedbackQuestionUpdateInputSchema,FeedbackQuestionUncheckedUpdateInputSchema ]),
  where: FeedbackQuestionWhereUniqueInputSchema,
}).strict()

export const FeedbackQuestionUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackQuestionUpdateManyArgs> = z.object({
  data: z.union([ FeedbackQuestionUpdateManyMutationInputSchema,FeedbackQuestionUncheckedUpdateManyInputSchema ]),
  where: FeedbackQuestionWhereInputSchema.optional(),
}).strict()

export const FeedbackQuestionDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackQuestionDeleteManyArgs> = z.object({
  where: FeedbackQuestionWhereInputSchema.optional(),
}).strict()

export const ContohCreateArgsSchema: z.ZodType<Prisma.ContohCreateArgs> = z.object({
  select: ContohSelectSchema.optional(),
  data: z.union([ ContohCreateInputSchema,ContohUncheckedCreateInputSchema ]),
}).strict()

export const ContohUpsertArgsSchema: z.ZodType<Prisma.ContohUpsertArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereUniqueInputSchema,
  create: z.union([ ContohCreateInputSchema,ContohUncheckedCreateInputSchema ]),
  update: z.union([ ContohUpdateInputSchema,ContohUncheckedUpdateInputSchema ]),
}).strict()

export const ContohCreateManyArgsSchema: z.ZodType<Prisma.ContohCreateManyArgs> = z.object({
  data: ContohCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ContohDeleteArgsSchema: z.ZodType<Prisma.ContohDeleteArgs> = z.object({
  select: ContohSelectSchema.optional(),
  where: ContohWhereUniqueInputSchema,
}).strict()

export const ContohUpdateArgsSchema: z.ZodType<Prisma.ContohUpdateArgs> = z.object({
  select: ContohSelectSchema.optional(),
  data: z.union([ ContohUpdateInputSchema,ContohUncheckedUpdateInputSchema ]),
  where: ContohWhereUniqueInputSchema,
}).strict()

export const ContohUpdateManyArgsSchema: z.ZodType<Prisma.ContohUpdateManyArgs> = z.object({
  data: z.union([ ContohUpdateManyMutationInputSchema,ContohUncheckedUpdateManyInputSchema ]),
  where: ContohWhereInputSchema.optional(),
}).strict()

export const ContohDeleteManyArgsSchema: z.ZodType<Prisma.ContohDeleteManyArgs> = z.object({
  where: ContohWhereInputSchema.optional(),
}).strict()

export const ContohImageCreateArgsSchema: z.ZodType<Prisma.ContohImageCreateArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  data: z.union([ ContohImageCreateInputSchema,ContohImageUncheckedCreateInputSchema ]),
}).strict()

export const ContohImageUpsertArgsSchema: z.ZodType<Prisma.ContohImageUpsertArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereUniqueInputSchema,
  create: z.union([ ContohImageCreateInputSchema,ContohImageUncheckedCreateInputSchema ]),
  update: z.union([ ContohImageUpdateInputSchema,ContohImageUncheckedUpdateInputSchema ]),
}).strict()

export const ContohImageCreateManyArgsSchema: z.ZodType<Prisma.ContohImageCreateManyArgs> = z.object({
  data: ContohImageCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ContohImageDeleteArgsSchema: z.ZodType<Prisma.ContohImageDeleteArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  where: ContohImageWhereUniqueInputSchema,
}).strict()

export const ContohImageUpdateArgsSchema: z.ZodType<Prisma.ContohImageUpdateArgs> = z.object({
  select: ContohImageSelectSchema.optional(),
  include: ContohImageIncludeSchema.optional(),
  data: z.union([ ContohImageUpdateInputSchema,ContohImageUncheckedUpdateInputSchema ]),
  where: ContohImageWhereUniqueInputSchema,
}).strict()

export const ContohImageUpdateManyArgsSchema: z.ZodType<Prisma.ContohImageUpdateManyArgs> = z.object({
  data: z.union([ ContohImageUpdateManyMutationInputSchema,ContohImageUncheckedUpdateManyInputSchema ]),
  where: ContohImageWhereInputSchema.optional(),
}).strict()

export const ContohImageDeleteManyArgsSchema: z.ZodType<Prisma.ContohImageDeleteManyArgs> = z.object({
  where: ContohImageWhereInputSchema.optional(),
}).strict()