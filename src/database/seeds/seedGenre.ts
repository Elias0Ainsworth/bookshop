import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedGenre() {
  for (let i = 0; i <= 10; i++) {
    await prisma.genre.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
      },
    });
  }
  console.log('Seed genre done');
}
