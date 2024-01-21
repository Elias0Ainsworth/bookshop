import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Author } from './entities/author.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AuthorCreateInput): Promise<Author> {
    const createAuthor = await this.prisma.author.create({ data });
    if (!createAuthor) {
      throw new Error('Cannot create author');
    }
    return createAuthor;
  }

  async findAll(where: Prisma.AuthorWhereInput): Promise<Author[]> {
    return await this.prisma.author.findMany({ where });
  }

  async findOne(where: Prisma.AuthorWhereUniqueInput): Promise<Author> {
    const findAuthor = await this.prisma.author.findUnique({ where });
    if (!findAuthor) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findAuthor;
  }

  async update(id: number, data: Prisma.AuthorUpdateInput): Promise<Author> {
    const findAuthors = await this.prisma.author.findMany({ where: { id } });
    if (!findAuthors) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.author.update({ where: { id }, data });
  }

  async remove(where: Prisma.AuthorWhereUniqueInput): Promise<Author> {
    const findAuthors = await this.prisma.author.findMany({ where });
    if (!findAuthors) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.author.delete({ where });
  }
}
