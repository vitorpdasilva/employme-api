import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenOutputDto {
  @ApiProperty({ required: true, description: 'Access Token' })
  @Expose()
  accessToken: string;

  @ApiProperty({ required: true, description: 'Refresh Token' })
  @Expose()
  refreshToken: string;
}
