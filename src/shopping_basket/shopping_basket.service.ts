import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ShoppingBasketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.ShoppingBasketCreateInput) {
    return await this.prisma.shoppingBasket.create({ data });
  }

  async findAll(where: Prisma.ShoppingBasketWhereInput) {
    return await this.prisma.shoppingBasket.findMany({ where });
  }

  async remove(where: Prisma.ShoppingBasketWhereUniqueInput) {
    return await this.prisma.shoppingBasket.delete({ where });
  }
}
