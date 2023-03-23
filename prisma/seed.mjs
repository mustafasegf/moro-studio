import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      id: "clfks2ea00000tbl1qakulgm3",
      email: "admin@example.com",
      nama: "Admin",
      role: "admin",
      hp: "",
    },
  });

  const blogManager = await prisma.user.upsert({
    where: { email: "blogmanager@example.com" },
    update: {},
    create: {
      id: "clfksezx30004tbl1lm78ybny",
      email: "blogmanager@example.com",
      nama: "Blog Manager",
      role: "blogManager",
      hp: "",
    },
  });

  const studioManager = await prisma.user.upsert({
    where: { email: "studioManager@example.com" },
    update: {},
    create: {
      id: "clfkt21s3000atbl1inzhynab",
      email: "studiomanager@example.com",
      nama: "Studio Manager",
      role: "studioManager",
      hp: "",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      id: "clfks6eab0002tbl1vzmqzv9z",
      email: "user@example.com",
      nama: "User",
      role: "user",
      hp: "",
    },
  });

  console.log({ admin, blogManager, studioManager, user });
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
