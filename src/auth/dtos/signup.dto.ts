import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
  @ApiProperty({ required: true, description: 'Name' })
  name: string

  @ApiProperty({ required: true, description: 'Email' })
  email: string

  @ApiProperty({ required: true, description: 'Password' })
  password: string
}
