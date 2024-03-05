import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger'
import { UserDto, UserOutputDto } from './user.dto'
import { Expose, Type } from 'class-transformer'
import { TokenOutputDto } from '../../shared/dtos/token.dto'

export class RegisterUserInputDto extends PickType(UserDto, ['email', 'name']) {
  @ApiProperty({ required: true, description: 'Password' })
  @Expose()
  public password: string
}

export class UpdateUserInputDto extends PartialType(
  OmitType(UserDto, ['email', 'id', 'passwordHash']),
) {}

export class RegisterUserDto extends PickType(UserDto, [
  'email',
  'name',
  'passwordHash',
]) {}

export class UserWithTokensOutputDto {
  @ApiProperty({ required: true, description: "User's info" })
  @Expose()
  @Type(() => UserOutputDto)
  public userData: UserOutputDto

  @ApiProperty({ required: true, description: 'Tokens to login' })
  @Expose()
  @Type(() => TokenOutputDto)
  public tokens: TokenOutputDto
}
