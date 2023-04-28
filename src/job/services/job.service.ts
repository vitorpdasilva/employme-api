import { Injectable } from '@nestjs/common';
import { JobRepository } from '../repositories/job.repository';
import { JobDto } from '../dtos/job.dto';
import { RegisterJobInputDto } from '../dtos/register.dto';

@Injectable()
export class JobService {
  constructor(private readonly repository: JobRepository) {}

  public findAll(): Promise<JobDto[]> {
    return this.repository.findAll();
  }

  public getById(id: string): Promise<JobDto> {
    return this.repository.findById(id);
  }

  public save(jobInput: RegisterJobInputDto): Promise<JobDto> {
    return this.repository.create(jobInput);
  }
}
