import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [AuthorModule, ConfigModule.forRoot({ isGlobal: true }), GenreModule],
})
export class AppModule {}
