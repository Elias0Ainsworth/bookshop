import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { IsString } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  birthday?: Date;
}
