import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.BookCreateInput): Promise<Book> {
    const createBook = await this.prisma.book.create({ data });
    if (!createBook) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }
    return createBook;
  }

  async findAll(where: Prisma.BookWhereInput): Promise<Book[]> {
    return await this.prisma.book.findMany({ where });
  }

  async findOne(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    const book = await this.prisma.book.findUnique({ where });
    if (!book) {
      throw new HttpException('Not founds', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async update(
    where: Prisma.BookWhereUniqueInput,
    data: Prisma.BookUpdateInput,
  ): Promise<Book> {
    const books = await this.prisma.book.findMany({ where });
    if (!books) {
      throw new HttpException('Not founds', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.book.update({ where, data });
  }

  async remove(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    const book = await this.prisma.book.findMany({ where });
    if (!book) {
      throw new HttpException('Not founds', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.book.delete({ where });
  }
}
