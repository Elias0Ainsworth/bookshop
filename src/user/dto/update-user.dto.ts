import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @MaxLength(25)
  @MinLength(4)
  password?: string;

  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  birthday?: Date;
}
