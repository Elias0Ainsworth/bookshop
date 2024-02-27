import { PrismaClient } from '@prisma/client';
import { seedAuthor } from './seeds/seedAuthor';
import { seedBook } from './seeds/seedBook';
import { seedGenre } from './seeds/seedGenre';

const prisma = new PrismaClient();

async function seed() {
  await seedAuthor();
  await seedGenre();
  await seedBook();
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
