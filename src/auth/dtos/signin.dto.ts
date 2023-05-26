import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ required: true, description: 'Email' })
  email: string;

  @ApiProperty({ required: true, description: 'Pawwrod' })
  password: string;
}

export class ProfileOutputDto {
  @ApiProperty({ required: true, description: 'Email' })
  email: string;

  @ApiProperty({ required: true, description: 'Sub' })
  sub: string;

  @ApiProperty({ required: true, description: 'IAT' })
  iat: number;

  @ApiProperty({ required: true, description: 'EXP' })
  exp: number;
}
