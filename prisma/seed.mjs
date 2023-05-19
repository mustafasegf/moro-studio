import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: {
      id: "clfks2ea00000tbl1qakulgm3",
    },
    update: {},
    create: {
      id: "clfks2ea00000tbl1qakulgm3",
      email: "admin@example.com",
      nama: "Admin",
      role: "admin",
    },
  });

  const blogManager = await prisma.user.upsert({
    where: {
      id: "clfksezx30004tbl1lm78ybny",
    },
    update: {},
    create: {
      id: "clfksezx30004tbl1lm78ybny",
      email: "blogmanager@example.com",
      nama: "Blog Manager",
      role: "blogManager",
    },
  });

  const studioManager = await prisma.user.upsert({
    where: { id: "clfkt21s3000atbl1inzhynab" },
    update: {},
    create: {
      id: "clfkt21s3000atbl1inzhynab",
      email: "studiomanager@example.com",
      nama: "Studio Manager",
      role: "studioManager",
    },
  });

  const user = await prisma.user.upsert({
    where: {
      id: "clfks6eab0002tbl1vzmqzv9z",
    },
    update: {},
    create: {
      id: "clfks6eab0002tbl1vzmqzv9z",
      email: "user@example.com",
      nama: "User",
      role: "user",
    },
  });

  const homepage = await prisma.home.upsert({
    where: {
      id: "clfks6eab0002tbl1vzmqzv9z",
    },
    update: {},
    create: {
      id: "clfks6eab0002tbl1vzmqzv9z",
      image: "https://picsum.photos/seed/1/800/600",
      carousel: [
        "https://picsum.photos/seed/1/800/600",
        "https://picsum.photos/seed/2/800/600",
        "https://picsum.photos/seed/3/800/600",
      ],
    },
  });

  console.log({ admin, blogManager, studioManager, user, homepage });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
