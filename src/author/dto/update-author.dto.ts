import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  first_name?: string;
  last_name?: string;
  birthday?: Date;
}
