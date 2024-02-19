import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingBasketController } from './shopping_basket.controller';
import { ShoppingBasketService } from './shopping_basket.service';

describe('ShoppingBasketController', () => {
  let controller: ShoppingBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingBasketController],
      providers: [ShoppingBasketService],
    }).compile();

    controller = module.get<ShoppingBasketController>(ShoppingBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
