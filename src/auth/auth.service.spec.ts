import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
describe('AuthService', () => {
  let service: AuthService;
  const prisma = new PrismaClient();
  let response;
  const user = {
    email: 'ahahah@gmail.com',
    password: 'ahahaha',
    first_name: 'Hah',
    last_name: 'hah',
    birthday: new Date(Date.now()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, ConfigService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    response = await service.signUp(user);
  });

  describe('signIn', () => {
    it('when it called it must will return instanceOf AccessTokenResponse', async () => {
      const result = await service.signIn({
        email: 'ahahah@gmail.com',
        password: 'ahahaha',
      });
      jest.spyOn(service, 'signIn').mockImplementation(async () => result);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('signUp', () => {
    it('when it called it must will return object', async () => {
      const checkUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      jest.spyOn(service, 'signUp').mockImplementation(async () => response);
      expect(checkUser.email).toBe(user.email);
    });
  });

  afterEach(async () => {
    response = await prisma.user.delete({ where: { email: user.email } });
  });
});
