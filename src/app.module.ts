import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ShoppingBasketModule } from './shopping_basket/shopping_basket.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import * as redisStore from 'cache-manager-redis-store';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GenreModule,
    BookModule,
    UserModule,
    ShoppingBasketModule,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 10,
      max: 10,
    }),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
