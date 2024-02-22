import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterCompanyInputDto {
  @ApiProperty({ required: true, description: 'name' })
  @Expose()
  public name: string;

  @ApiProperty({ required: true, description: 'email' })
  @Expose()
  public email: string;

  @ApiProperty({ required: true, description: 'password' })
  @Expose()
  public password: string;
}
