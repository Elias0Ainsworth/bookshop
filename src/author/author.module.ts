import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService, PrismaService],
})
export class AuthorModule {}
