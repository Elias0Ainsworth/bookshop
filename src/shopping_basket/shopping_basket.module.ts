import { Module } from '@nestjs/common';
import { ShoppingBasketService } from './shopping_basket.service';
import { ShoppingBasketController } from './shopping_basket.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ShoppingBasketController],
  providers: [ShoppingBasketService, PrismaService],
})
export class ShoppingBasketModule {}
