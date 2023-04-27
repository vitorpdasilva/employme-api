import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { TokenOutputDto } from '../../shared/dtos/token.dto';
import { TokenService } from './../../shared/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
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
    return this.tokenService.generate(payload);
  }

  public async refreshToken(email: string): Promise<TokenOutputDto> {
    const user = await this.userService.findByEmail(email);
    const payload = { email: user.email, sub: user.id };
    return this.tokenService.generate(payload);
  }
}
