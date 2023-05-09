import { Injectable } from '@nestjs/common';
import { SkillDto } from '../dtos/skill.dto';
import { SkillRepository } from '../repositories/skill.repository';

@Injectable()
export class SkillService {
  constructor(private readonly repository: SkillRepository) {}

  public async findAll(): Promise<SkillDto[]> {
    return await this.repository.findAll();
  }
}
