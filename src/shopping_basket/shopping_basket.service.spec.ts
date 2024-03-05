import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingBasketService } from './shopping_basket.service';
import { PrismaService } from 'src/database/prisma.service';

describe('ShoppingBasketService', () => {
  let service: ShoppingBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingBasketService, PrismaService],
    }).compile();

    service = module.get<ShoppingBasketService>(ShoppingBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
