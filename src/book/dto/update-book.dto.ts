import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  title?: string;

  @IsInt()
  author_id?: number;

  @IsInt()
  genre_id?: number;

  date?: Date;
}
