import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthorModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
