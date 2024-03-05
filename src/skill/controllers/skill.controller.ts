import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { SkillListOutputDto } from '../dtos/skill.dto'
import { SkillService } from '../services/skill.service'

@ApiTags("Skill's")
@Controller('skillList')
export class SkillController {
  constructor(private readonly service: SkillService) {}

  @ApiResponse({ type: SkillListOutputDto })
  @Get()
  public async list(): Promise<SkillListOutputDto> {
    const skills = await this.service.findAll()
    return {
      skillList: skills,
    }
  }
}
