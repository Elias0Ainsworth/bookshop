import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [AuthorModule, ConfigModule.forRoot({ isGlobal: true }), GenreModule, BookModule],
})
export class AppModule {}
