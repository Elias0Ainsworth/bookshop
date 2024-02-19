import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingBasketService } from './shopping_basket.service';

describe('ShoppingBasketService', () => {
  let service: ShoppingBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingBasketService],
    }).compile();

    service = module.get<ShoppingBasketService>(ShoppingBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
