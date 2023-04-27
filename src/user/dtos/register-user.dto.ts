import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { Expose } from 'class-transformer';

export class RegisterUserInputDto extends PickType(UserDto, ['email']) {
  @ApiProperty({ required: true, description: 'Password' })
  @Expose()
  public password: string;
}

export class RegisterUserDto extends PickType(UserDto, [
  'email',
  'passwordHash',
]) {}
