import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ShoppingBasketModule } from './shopping_basket/shopping_basket.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    AuthorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GenreModule,
    BookModule,
    UserModule,
    ShoppingBasketModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
