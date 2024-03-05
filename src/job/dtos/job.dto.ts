import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

class LocationDto {
  @ApiProperty({ type: String })
  @Expose()
  city: string

  @ApiProperty({ type: String })
  @Expose()
  country: string

  @ApiProperty({ type: String })
  @Expose()
  province: string
}

class SalaryDto {
  @ApiProperty({ type: Number })
  @Expose()
  from: number

  @ApiProperty({ type: Number })
  @Expose()
  to: number

  @ApiProperty({ type: String })
  @Expose()
  currency: string

  @ApiProperty({ type: String })
  @Expose()
  period: string
}

export class JobDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string

  @ApiProperty({ type: String })
  @Expose()
  title: string

  @ApiProperty({ type: Boolean })
  @Expose()
  recent: boolean

  @ApiProperty({ type: [String] })
  @Expose()
  applicants: string[]

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date

  @ApiProperty({ type: String })
  @Expose()
  description: string

  @ApiProperty({ type: [String] })
  @Expose()
  tags: string[]

  @ApiProperty({ type: String })
  @Expose()
  locationType: string

  @ApiProperty({ type: LocationDto })
  @Expose()
  location: LocationDto

  @ApiProperty({ type: SalaryDto })
  @Expose()
  salary: SalaryDto
}
