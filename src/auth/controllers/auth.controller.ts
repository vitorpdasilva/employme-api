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
import { TokenOutputDto } from '../../shared/dtos/token.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { SignInDto } from '../dtos/signin.dto';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ description: 'Login' })
  @ApiOkResponse({ type: TokenOutputDto })
  @ApiBadRequestResponse({
    description: 'Email is required; Password is required',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return {
      userData: await this.userService.findByEmail(signInDto.email),
      tokens: await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      ),
    };
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
}
