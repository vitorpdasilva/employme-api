import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillDto } from '../dtos/skill.dto';
import { Skill, SkillDocument } from '../schemas/skill.schema';
import { plainToDto } from '../../common/helpers/plain-to-dto.helper';

@Injectable()
export class SkillRepository{
  constructor(@InjectModel(Skill.name) private model: Model<Skill>) {}

  public async findAll(): Promise<SkillDto[]> {
    const skills = await this.model.find().lean();
    return plainToDto<SkillDocument, SkillDto[]>(SkillDto, skills);
  }
}
