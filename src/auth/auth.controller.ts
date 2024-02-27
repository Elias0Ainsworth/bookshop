import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import SignInDto from './dto/sign-in.dto';
import AccessTokenResponse from './dto/access-token.response';
import { Public } from './decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'registration user',
    description: 'for registration user',
  })
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

  @ApiOperation({
    summary: 'logging user',
    description: 'for logging user',
  })
  @Public()
  @Post('signin')
  async signIn(@Body() data: SignInDto): Promise<AccessTokenResponse> {
    return await this.authService.signIn(data);
  }
}
