import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import AccessToken from './dto/accessToket.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async signin(signin: SignInDto): Promise<AccessToken> {
    const userByEmail = await this.prisma.user.findUnique({
      where: { email: signin.email },
    });
    if (!userByEmail) {
      throw new HttpException('Access Denied', HttpStatus.NOT_ACCEPTABLE);
    }

    if (!(await bcrypt.compare(signin.password, userByEmail.hash_password))) {
      throw new HttpException('Access Denied', HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.createToken(userByEmail.id, signin.email);
  }

  async createToken(userId, email) {
    const accessToken = this.jwt.sign(
      { userId, email },
      {
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRESIN'),
        secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      },
    );

    return { accessToken };
  }
}
