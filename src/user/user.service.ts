import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const createUser = await this.prisma.user.create({ data });
    if (!createUser) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }
    return createUser;
  }

  async findAll(where: Prisma.UserWhereInput): Promise<User[]> {
    return await this.prisma.user.findMany({ where });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    this.checkUser(user);
    return user;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    this.checkUser(user);
    return await this.prisma.user.update({ where, data });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    this.checkUser(user);
    return await this.prisma.user.delete({ where });
  }

  private async checkUser(user: Prisma.UserWhereUniqueInput) {
    if (!user) {
      throw new HttpException('Not created', HttpStatus.NOT_FOUND);
    }
  }
}
