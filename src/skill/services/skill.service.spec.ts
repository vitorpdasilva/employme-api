import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skill.service';
import { SkillRepository } from '../repositories/skill.repository';

const mockSkillRepository = {};

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: SkillRepository,
          useValue: mockSkillRepository,
        },
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
