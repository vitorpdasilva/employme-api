import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/services/user.service';
import { JobRepository } from '../repositories/job.repository';
import { JobService } from './job.service';
import { BadRequestException } from '@nestjs/common';

const mockUserService = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  updateAppliedJob: jest.fn(),
};

const mockJobRepository = {
  findById: jest.fn(),
  addApplicant: jest.fn(),
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

  describe('findById', () => {
    const jobId = 'fafd1';
    it('should return a job by id', async () => {
      mockJobRepository.findById.mockResolvedValueOnce({});
      await service.findById(jobId);
      expect(mockJobRepository.findById).toHaveBeenCalledWith(jobId);
    });

    it('should thrown a error when job not exists', () => {
      mockJobRepository.findById.mockResolvedValueOnce(null);
      expect(() => service.findById(jobId)).rejects.toThrowError(
        new BadRequestException('Job not found'),
      );
    });
  });

  describe('apply', () => {
    const jobId = 'fafd1';
    const userId = 'cet43';

    it('should return a job by id', async () => {
      const jobMock = { id: jobId };
      const userMock = { id: userId };
      mockJobRepository.findById.mockResolvedValueOnce(jobMock);
      mockUserService.findById.mockResolvedValueOnce(userMock);
      mockJobRepository.addApplicant.mockResolvedValueOnce(jobMock);
      mockUserService.updateAppliedJob.mockResolvedValueOnce(null);
      await service.apply(jobId, userId);
      expect(mockJobRepository.findById).toHaveBeenCalledWith(jobId);
      expect(mockUserService.findById).toHaveBeenCalledWith(userId);
      expect(mockJobRepository.addApplicant).toHaveBeenCalledWith(
        jobMock,
        userId,
      );
      expect(mockUserService.updateAppliedJob).toHaveBeenCalledWith(
        userMock,
        jobId,
      );
    });
  });
});
