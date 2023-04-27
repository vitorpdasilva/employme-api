import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from '../services/job.service';
import { JobDto } from '../dtos/job.dto';

@ApiTags("Job's")
@Controller('job')
export class JobController {
  constructor(private readonly service: JobService) {}

  @ApiResponse({ type: [JobDto] })
  @Get()
  public async list(): Promise<JobDto[]> {
    return this.service.findAll();
  }

  @Post()
  public async create(@Body() body) {
    const { title, location, locationType, salary } = body;
    console.log({ body })
    if (!title || !location || !locationType || !salary) {
        throw new BadRequestException('One of the required fields is missing');
    }
  }

  @ApiResponse({ type: JobDto })
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<JobDto> {
    return this.service.getById(id);
  }

  /**
   * @todo
   * register user a applicant
   * update user job applied
   */
  @Post(':id/apply')
  public async apply() {

  }
}
