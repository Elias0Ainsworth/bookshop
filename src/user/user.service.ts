import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const isEmailExist = !!(await this.prisma.user.findUnique({
      where: { email: data.email },
    }));

    if (isEmailExist) {
      throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(+this.config.get('SALT_ROUNDS'));
    const user_hash_password = await bcrypt.hash(data.hash_password, salt);

    data.hash_password = user_hash_password;

    const createUser = await this.prisma.user.create({ data });
    if (!createUser) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }
    const { hash_password, ...result } = createUser;
    return result;
  }

  async findAll(where: Prisma.UserWhereInput): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where });
    return users.map((user) => {
      const { hash_password, ...result } = user;
      return result;
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    this.checkUser(user);
    const { hash_password, ...result } = user;
    return result;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    this.checkUser(user);
    const updateUser = await this.prisma.user.update({ where, data });
    const { hash_password, ...result } = updateUser;
    return result;
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    this.checkUser(user);
    const userRemove = await this.prisma.user.delete({ where });
    const { hash_password, ...result } = userRemove;
    return result;
  }

  private async checkUser(user: Prisma.UserWhereUniqueInput) {
    if (!user) {
      throw new HttpException('Not created', HttpStatus.NOT_FOUND);
    }
  }
}
