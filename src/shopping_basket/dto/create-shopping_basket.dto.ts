import { IsNotEmpty, IsInt } from 'class-validator';
export class CreateShoppingBasketDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  book_id: number;
}
