import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBook() {
  const genres = await prisma.genre.findMany();
  const authors = await prisma.author.findMany();

  for (let i = 0; i <= 10; i++) {
    await prisma.book.create({
      data: {
        title: faker.lorem.sentence(),
        author_id: Math.floor(Math.random() * authors.length),
        genre_id: Math.floor(Math.random() * genres.length),
        date: faker.date.birthdate(),
      },
    });
  }
  console.log('Seed book done');
}
