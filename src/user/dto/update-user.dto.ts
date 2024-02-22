import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  birthday?: Date;
}
