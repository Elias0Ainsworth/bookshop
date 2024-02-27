import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAuthor() {
  for (let i = 0; i <= 10; i++) {
    await prisma.author.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        birthday: faker.date.birthdate(),
      },
    });
  }
  console.log('Seed author done');
}
