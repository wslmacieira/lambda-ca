import { PrismaClient } from '../infra/database/generated/client';

export const createPrismaClient = () => {
  const prisma = new PrismaClient();
  return prisma;
};
