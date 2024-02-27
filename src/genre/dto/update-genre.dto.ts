import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsString } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
