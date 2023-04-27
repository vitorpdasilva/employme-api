import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { TokenOutputDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<TokenOutputDto> {
    if (!email) {
      throw new BadRequestException('Email is required!');
    }
    if (!password) {
      throw new BadRequestException('Password is required!');
    }
    const user = await this.userService.findByEmail(email);
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new UnauthorizedException('Invalid password!');
    }
    const payload = { email: user.email, sub: user.id };
    return this.generateTokens(payload);
  }

  public async refreshToken(email: string): Promise<TokenOutputDto> {
    const user = await this.userService.findByEmail(email);
    const payload = { email: user.email, sub: user.id };
    return this.generateTokens(payload);
  }

  private async generateTokens<T extends string | object | Buffer>(
    payload: T,
  ): Promise<TokenOutputDto> {
    const refreshExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: refreshExpiresIn,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
