import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  title?: string;
  author_id?: number;
  genre_id?: number;
  date?: Date;
}
