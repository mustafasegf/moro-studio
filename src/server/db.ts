import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// todo: add soft delete to catalogue
prisma.$use(async (params, next) => {
  if (params.model == "User") {
    if (params.action == "delete") {
      params.action = "update";
      params.args["data"] = { deleted: true };
    }
    if (params.action == "deleteMany") {
      params.action = "updateMany";
      if (params.args.data != undefined) {
        params.args.data["deleted"] = true;
      } else {
        params.args["data"] = { deleted: true };
      }
    }
  }

  return next(params)
});

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
