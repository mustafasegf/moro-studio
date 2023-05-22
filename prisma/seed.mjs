import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const userData = [
    {
      id: "clfks2ea00000tbl1qakulgm3",
      email: "admin@example.com",
      nama: "Admin",
      role: "admin",
    },
    {
      id: "clfksezx30004tbl1lm78ybny",
      email: "blogmanager@example.com",
      nama: "Blog Manager",
      role: "blogManager",
    },
    {
      id: "clfkt21s3000atbl1inzhynab",
      email: "studiomanager@example.com",
      nama: "Studio Manager",
      role: "studioManager",
    },
    {
      id: "clfks6eab0002tbl1vzmqzv9z",
      email: "user@example.com",
      nama: "User",
      role: "user",
    },
  ];

  const user = [];
  for (const data of userData) {
    user.push(
      await prisma.user.upsert({
        where: {
          id: data.id,
        },
        update: {},
        create: {
          id: data.id,
          email: data.email,
          nama: data.nama,
          // @ts-ignore
          role: data.role,
        },
      })
    );
  }

  const katalogData = [
    {
      id: "clgkwzhtc0000tb3hdplev11u",
      nama: "Basic Self Photo",
      durasi: 40,
      harga: 150_000,
      jumlahOrang: 2,
      deskripsi: `20 Minutes Photoshoot
10 Minutes Photo Selection
Various Properties and Frames
All digital Soft files`,
    },
    {
      id: "clh4qplik0002tbocyydiby5b",
      nama: "3 Person",
      durasi: 40,
      harga: 180_000,
      jumlahOrang: 3,
      deskripsi: `20 Minutes Photoshoot
10 Minutes Photo Selection
Various Properties and Frames
All digital Soft files`,
    },
    {
      id: "clh4qpw7r0004tbocs99rpsja",
      nama: "4 Person",
      durasi: 40,
      harga: 210_000,
      jumlahOrang: 4,
      deskripsi: `20 Minutes Photoshoot
10 Minutes Photo Selection
Various Properties and Frames
All digital Soft files`,
    },
    {
      id: "clh4qq6zy0006tboc4no88nyu",
      nama: "5 Person",
      durasi: 40,
      harga: 240_000,
      jumlahOrang: 5,
      deskripsi: `20 Minutes Photoshoot
10 Minutes Photo Selection
Various Properties and Frames
All digital Soft files`,
    },
    {
      id: "clh4qqgxl0008tbocttk0ss6d",
      nama: "6 Person",
      durasi: 40,
      harga: 270_000,
      jumlahOrang: 6,
      deskripsi: `20 Minutes Photoshoot
10 Minutes Photo Selection
Various Properties and Frames
All digital Soft files`,
    },
    {
      id: "clh4qsenx000atboc3gpfb3tm",
      nama: "Group of 7 Self Photo",
      durasi: 80,
      harga: 350_000,
      deskripsi: `40 Minutes Photoshoot
20 Minutes Photo Selection
Various Properties and Frames
All digital Soft files
Additional Person @30.000 (include 1 printed photo each)`,
    },
  ];

  const katalog = [];
  for (const data of katalogData) {
    katalog.push(
      await prisma.katalog.upsert({
        where: {
          id: data.id,
        },
        update: {},
        create: data,
      })
    );
  }

  const backgroundFotoData = [
    {
      warna: "White Background (Preset Colorfull)",
    },
    {
      warna: "White Background (Preset Black & White)",
    },
    {
      warna: "Black Background (Preset Colorfull)",
    },
    {
      warna: "Black Background (Preset Black & White)",
    },
  ];

  const backgroundFoto = [];
  for (const data of backgroundFotoData) {
    backgroundFoto.push(
      await prisma.backgroundFoto.upsert({
        where: {
          warna: data.warna,
        },
        update: {},
        create: {
          warna: data.warna,
        },
      })
    );
  }

  console.log({
    user,
    katalog,
    backgroundFoto,
  });
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
