import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('AuthController', () => {
  let controller: AuthController;
  const prisma = new PrismaClient();
  let response;
  const user = {
    email: 'test@gmail.com',
    password: 'test',
    first_name: 'Hah',
    last_name: 'hah',
    birthday: new Date(Date.now()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, ConfigService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    response = await controller.signUp(user);
  });

  describe('signIn', () => {
    it('when it called it must will return instanceOf AccessTokenResponse', async () => {
      const result = await controller.signIn({
        email: 'test@gmail.com',
        password: 'test',
      });
      jest.spyOn(controller, 'signIn').mockImplementation(async () => result);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('signUp', () => {
    it('when it called it must will return object', async () => {
      const checkUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      jest.spyOn(controller, 'signUp').mockImplementation(async () => response);
      expect(checkUser.email).toBe(user.email);
    });
  });

  afterEach(async () => {
    response = await prisma.user.delete({ where: { email: user.email } });
  });

});
