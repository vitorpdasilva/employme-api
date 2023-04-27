import { Injectable } from '@nestjs/common';
import { JobRepository } from '../repositories/job.repository';
import { JobDto } from '../dtos/job.dto';

@Injectable()
export class JobService {
  constructor(private readonly repository: JobRepository) {}

  public findAll(): Promise<JobDto[]> {
    return this.repository.findAll()
  }

  public getById(id: string): Promise<JobDto> {
    return this.repository.findById(id)
  }
}
