import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  author_id: number;

  @IsInt()
  @IsNotEmpty()
  genre_id: number;

  @IsNotEmpty()
  date: Date;
}
