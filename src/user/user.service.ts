import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(where: Prisma.UserWhereInput): Promise<User[]> {
    // await this.cacheManager.set('hehe', 'hehe');
    // const log = await this.cacheManager.get('1231');
    // console.log(log);
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
