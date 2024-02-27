import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToDto } from '../../common/helpers/plain-to-dto.helper';
import { TokenOutputDto } from '../../shared/dtos/token.dto';
import { UserWithTokensOutputDto } from '../../user/dtos/register-user.dto';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { SignInDto, SignUpDto } from '../dtos';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ description: 'Login' })
  @ApiOkResponse({ type: UserWithTokensOutputDto })
  @ApiBadRequestResponse({
    description: 'Email is required; Password is required',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const [userData, tokens] = await Promise.all([
      this.userService.findByEmail(signInDto.email),
      this.authService.signIn(signInDto.email, signInDto.password),
    ]);
    const response = {
      userData,
      tokens,
    };
    return plainToDto(UserWithTokensOutputDto, response);
  }

  @ApiOperation({ description: 'Refresh tokens' })
  @ApiOkResponse({ type: TokenOutputDto })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get('refresh')
  @UseGuards(AuthGuard)
  refreshToken(@Request() request: Request) {
    const { email } = request['user'];
    return this.authService.refreshToken(email);
  }

  @ApiOperation({ description: 'Sign Up' })
  @ApiOkResponse({ type: UserWithTokensOutputDto })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  @ApiNotFoundResponse({ description: 'User already found' })
  @ApiBadRequestResponse({
    description: 'Email is required; Password is required; name is required',
  })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { userData, tokens } = await this.userService.register({
      name: signUpDto.name,
      email: signUpDto.email,
      password: signUpDto.password,
    });

    const response = {
      userData,
      tokens,
    };
    return plainToDto(UserWithTokensOutputDto, response);
  }
}
