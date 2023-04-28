import { ApiProperty, PickType, IntersectionType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { Expose } from 'class-transformer';
import { TokenOutputDto } from '../../shared/dtos/token.dto';

export class RegisterUserInputDto extends PickType(UserDto, ['email']) {
  @ApiProperty({ required: true, description: 'Password' })
  @Expose()
  public password: string;
}

export class RegisterUserDto extends PickType(UserDto, [
  'email',
  'passwordHash',
]) {}

export class RegisterUserOutputDto extends IntersectionType(
  RegisterUserDto,
  TokenOutputDto,
) {}
