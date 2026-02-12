
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg'


declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPostgresAdapter({ connectionString });

export const db =
  globalThis.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}