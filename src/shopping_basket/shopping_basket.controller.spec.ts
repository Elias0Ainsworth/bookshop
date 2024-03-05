import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingBasketController } from './shopping_basket.controller';
import { ShoppingBasketService } from './shopping_basket.service';
import { PrismaService } from 'src/database/prisma.service';

describe('ShoppingBasketController', () => {
  let controller: ShoppingBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingBasketController],
      providers: [ShoppingBasketService, PrismaService],
    }).compile();

    controller = module.get<ShoppingBasketController>(ShoppingBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
