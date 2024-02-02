import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ShoppingBasketModule } from './shopping_basket/shopping_basket.module';

@Module({
  imports: [
    AuthorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GenreModule,
    BookModule,
    UserModule,
    ShoppingBasketModule,
  ],
})
export class AppModule {}
