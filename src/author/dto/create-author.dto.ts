import { IsString, IsNotEmpty } from 'class-validator';
export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  birthday: Date;
}
