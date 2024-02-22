import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import AccessTokenResponse from './dto/access-token.response';
import SignInDto from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(data: Prisma.UserCreateInput): Promise<AccessTokenResponse> {
    const isExist = !!(await this.prisma.user.findUnique({
      where: { email: data.email },
    }));
    if (isExist) {
      throw new HttpException('This email is already exist', HttpStatus.FOUND);
    }
    const salt = await bcrypt.genSalt(+this.config.get('SALT_ROUNDS'));
    const hash_password = await bcrypt.hash(data.password, salt);

    data.password = hash_password;

    const createUser = await this.prisma.user.create({ data });
    if (!createUser) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }

    const roles = await this.prisma.userRole.create({
      data: { user_id: createUser.id, role_id: +this.config.get('USER_ROLE') },
      select: { roleId: true },
    });
    return this.createToken(createUser.id, createUser.email, [
      roles.roleId.name,
    ]);
  }

  async signIn(data: SignInDto): Promise<AccessTokenResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { role: true },
    });
    if (!user) {
      throw new HttpException('This email is already exist', HttpStatus.FOUND);
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new HttpException('Access Denied', HttpStatus.NOT_ACCEPTABLE);
    }
    const roles = await this.prisma.role.findMany({
      where: { id: { in: [...user.role.map((role) => role.role_id)] } },
    });
    return await this.createToken(user.id, user.email, [
      ...roles.map((role) => role.name),
    ]);
  }

  async createToken(userId, email, roles) {
    const accessToken = this.jwt.sign(
      { userId, email, roles },
      {
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRESIN'),
        secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      },
    );

    return { accessToken };
  }
}
