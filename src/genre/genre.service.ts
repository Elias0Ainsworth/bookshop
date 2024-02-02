import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Genre, Prisma } from '@prisma/client';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.GenreCreateInput): Promise<Genre> {
    const createGenre = await this.prisma.genre.create({ data });
    if (!createGenre) {
      throw new HttpException('Cannot create genre', HttpStatus.BAD_REQUEST);
    }
    return createGenre;
  }

  async findAll(where: Prisma.GenreWhereInput): Promise<Genre[]> {
    return await this.prisma.genre.findMany({ where });
  }

  async findOne(where: Prisma.GenreWhereUniqueInput): Promise<Genre> {
    const findGenre = await this.prisma.genre.findUnique({ where });
    if (!findGenre) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findGenre;
  }

  async update(
    where: Prisma.GenreWhereUniqueInput,
    data: Prisma.GenreUpdateInput,
  ): Promise<Genre> {
    const findGenre = await this.prisma.genre.update({
      where,
      data,
    });
    if (!findGenre) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findGenre;
  }

  async remove(where: Prisma.GenreWhereUniqueInput): Promise<Genre> {
    const findGenre = await this.prisma.genre.findUnique({ where });
    if (!findGenre) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.genre.delete({ where });
  }
}
