import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillController } from './controllers/skill.controller';
import { SkillList, SkillSchema } from './schemas/skill.schema';
import { SkillService } from './services/skill.service';
import { SkillRepository } from './repositories/skill.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SkillList.name, schema: SkillSchema }]),
  ],
  providers: [SkillService, SkillRepository],
  controllers: [SkillController],
})
export class SkillModule {}
