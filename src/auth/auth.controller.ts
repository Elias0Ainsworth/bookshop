import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import AccessToken from './dto/accessToket.response';
import { User } from 'src/user/entities/user.entity';
import { Public } from './decorators/public-.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create({
      ...createUserDto,
      birthday: new Date(createUserDto.birthday),
    });
  }

  @Public()
  @Post('/signin')
  async signIn(@Body() signIn: SignInDto): Promise<AccessToken> {
    return await this.authService.signin(signIn);
  }

}
