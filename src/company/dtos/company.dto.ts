import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class Location {
  @Expose()
  public country: string;

  @Expose()
  public city: string;

  @Expose()
  public address: string;

  @Expose()
  public postalCode: string;

  @Expose()
  public provinceOrState: string;
}

export class CompanyDto {
  @ApiProperty({ required: true, description: 'id' })
  @Expose()
  public id: string;

  @ApiProperty({ required: true, description: 'name' })
  @Expose()
  public name: string;

  @ApiProperty({ required: true, description: 'location' })
  @Expose()
  public location: Location;

  @ApiProperty({ required: true, description: 'website' })
  @Expose()
  public website: string;

  @ApiProperty({ required: true, description: 'adminEmail' })
  @Expose()
  public adminEmail: string;

  @ApiProperty({ required: true, description: 'phone' })
  @Expose()
  public phone: string;
}

export class CompanyOutputDto extends OmitType(CompanyDto, ['adminEmail']) {}
