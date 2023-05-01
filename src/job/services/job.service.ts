import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JobRepository } from '../repositories/job.repository';
import { JobDto } from '../dtos/job.dto';
import { RegisterJobInputDto } from '../dtos/register.dto';

@Injectable()
export class JobService {
  constructor(
    private readonly repository: JobRepository,
    private readonly userService: UserService,
  ) {}

  public findAll(): Promise<JobDto[]> {
    return this.repository.findAll();
  }

  public async findById(id: string): Promise<JobDto> {
    const job = await this.repository.findById(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  public save(jobInput: RegisterJobInputDto): Promise<JobDto> {
    return this.repository.create(jobInput);
  }

  public async apply(jobId: string, applicantId: string): Promise<JobDto> {
    const [job, user] = await Promise.all([
      this.findById(jobId),
      this.userService.findById(applicantId),
    ]);
    const jobSaved = await this.repository.addApplicant(job, user.id);
    await this.userService.updateAppliedJob(user, jobSaved.id);
    return jobSaved;
  }
}
