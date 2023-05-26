import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenOutputDto } from '../dtos/token.dto';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async generate<T extends string | object | Buffer>(
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

  public verify<T extends object = any>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
