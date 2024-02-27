import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShoppingBasketService } from './shopping_basket.service';
import { CreateShoppingBasketDto } from './dto/create-shopping_basket.dto';
import { ShoppingBasket } from './entities/shopping_basket.entity';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Shopping basket')
@Controller('shopping-basket')
export class ShoppingBasketController {
  constructor(private readonly shoppingBasketService: ShoppingBasketService) {}

  @ApiOperation({
    summary: 'create shopping basket',
    description: 'to add book into user basket',
  })
  @Post()
  async createBasket(
    @Body() createShoppingBasketDto: CreateShoppingBasketDto,
  ): Promise<ShoppingBasket> {
    return await this.shoppingBasketService.create({
      user: { connect: { id: createShoppingBasketDto.user_id } },
      book: { connect: { id: createShoppingBasketDto.book_id } },
    });
  }

  @ApiOperation({
    summary: 'get all user book from basket',
    description: 'to get all book from user basket',
  })
  @Get()
  async getAllBasket(
    @Query('user_id') user: string,
    @Query('book_id') book: string,
  ): Promise<ShoppingBasket[]> {
    const user_id = user ? +user : undefined;
    const book_id = book ? +book : undefined;
    return await this.shoppingBasketService.findAll({ user_id, book_id });
  }

  @ApiOperation({
    summary: 'delete shopping basket',
    description: 'delete book from user basket',
  })
  @Delete(':id')
  async removeBasket(
    @Param('id') book: string,
    @GetCurrentUserId() user_id: number,
  ): Promise<ShoppingBasket> {
    const book_id = book ? +book : undefined;
    return await this.shoppingBasketService.remove({
      user_id_book_id: { book_id, user_id },
    });
  }
}
