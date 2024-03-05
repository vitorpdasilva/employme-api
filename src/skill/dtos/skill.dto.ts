import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class SkillDto {
  @ApiProperty({ required: true, description: 'ID' })
  @Expose()
  public id: string

  @ApiProperty({ required: true, description: 'Name' })
  @Expose()
  public name: string
}

export class SkillListOutputDto {
  @ApiProperty({ required: true, description: 'Skill List' })
  @Expose()
  public skillList: SkillDto[]
}
