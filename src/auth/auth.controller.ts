import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import SignInDto from './dto/sign-in.dto';
import AccessTokenResponse from './dto/access-token.response';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AccessTokenResponse> {
    return await this.authService.signUp({
      ...createUserDto,
      birthday: new Date(createUserDto.birthday),
    });
  }

  @Public()
  @Post('signin')
  async signIn(@Body() data: SignInDto): Promise<AccessTokenResponse> {
    return await this.authService.signIn(data);
  }
}
