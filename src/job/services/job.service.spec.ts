import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/services/user.service';
import { JobRepository } from '../repositories/job.repository';
import { JobService } from './job.service';

const mockUserService = {
  findByEmail: jest.fn(),
};

const mockJobRepository = {
  generate: jest.fn(),
};

describe('JobService', () => {
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JobRepository,
          useValue: mockJobRepository,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
