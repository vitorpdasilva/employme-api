import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToDto } from '../../common/helpers/plain-to-dto.helper';
import { JobDto } from '../dtos/job.dto';
import { Job, JobDocument } from '../schemas/job.schema';

@Injectable()
export class JobRepository{
  constructor(@InjectModel(Job.name) private model: Model<Job>) {}

  public async findAll(): Promise<JobDto[]> {
    const jobs = await this.model.find().lean();
    return plainToDto<JobDocument, JobDto[]>(JobDto, jobs);
  }

  public async findById(id: string): Promise<JobDto> {
    const job = await this.model.findOne({ _id: id}).lean();
    return plainToDto<JobDocument, JobDto>(JobDto, job);
  }

  public async create(jobInput: JobDto): Promise<JobDto> {
    const job = (await new this.model(jobInput).save()).toJSON();
    return plainToDto<JobDocument, JobDto>(JobDto, job);
  }
}
