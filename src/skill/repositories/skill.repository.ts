import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillDto } from '../dtos/skill.dto';
import { SkillList, SkillDocument } from '../schemas/skill.schema';
import { plainToDto } from '../../common/helpers/plain-to-dto.helper';

@Injectable()
export class SkillRepository {
  constructor(@InjectModel(SkillList.name) private model: Model<SkillList>) {}

  public async findAll(): Promise<SkillDto[]> {
    const skills = await this.model.find().lean();
    console.log({ skills });
    return plainToDto<SkillDocument, SkillDto[]>(SkillDto, skills);
  }
}
