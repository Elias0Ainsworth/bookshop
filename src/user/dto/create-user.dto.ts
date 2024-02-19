export class CreateUserDto {
  email: string;
  hash_password: string;
  first_name: string;
  last_name: string;
  birthday: Date;
}
