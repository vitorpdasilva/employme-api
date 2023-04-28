import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from '../services/job.service';
import { JobDto } from '../dtos/job.dto';
import { RegisterJobInputDto } from '../dtos/register.dto';

@ApiTags("Job's")
@Controller('job')
export class JobController {
  constructor(private readonly service: JobService) {}

  @ApiOkResponse({ type: [JobDto] })
  @Get()
  public async list(): Promise<JobDto[]> {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: JobDto })
  @Post()
  public async create(@Body() body: RegisterJobInputDto): Promise<JobDto> {
    const { title, location, locationType, salary } = body;
    if (!title || !location || !locationType || !salary) {
      throw new BadRequestException('One of the required fields is missing');
    }
    return this.service.save(body);
  }

  @ApiOkResponse({ type: JobDto })
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<JobDto> {
    return this.service.findById(id);
  }

  /**
   * @todo
   * register user a applicant
   * update user job applied
   */
  @ApiOkResponse({ type: JobDto })
  @Post(':id/apply')
  public async apply(
    @Param('id') id: string,
    @Body('applicantId') applicantId: string,
  ): Promise<JobDto> {
    console.log('parmas', id, applicantId);
    return this.service.apply(id, applicantId);
  }
}
