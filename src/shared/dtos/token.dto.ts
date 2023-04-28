import { ApiProperty } from '@nestjs/swagger';

export class TokenOutputDto {
  @ApiProperty({ required: true, description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ required: true, description: 'Refresh Token' })
  refreshToken: string;
}
