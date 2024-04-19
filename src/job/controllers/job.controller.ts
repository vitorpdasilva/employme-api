import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JobService } from '../services/job.service'
import { JobDto, ApplyToJobDto } from '../dtos/job.dto'
import { RegisterJobInputDto } from '../dtos/register-job.dto'

@ApiTags('Jobs')
@Controller('job')
export class JobController {
  constructor(private readonly service: JobService) {}

  @ApiOkResponse({ type: [JobDto] })
  @Get('list')
  public async list(): Promise<JobDto[]> {
    return this.service.findAll()
  }

  @ApiOkResponse({ type: JobDto })
  @Post('create')
  public async create(@Body() body: RegisterJobInputDto): Promise<JobDto> {
    const { title, location, locationType, salary } = body
    if (!title || !location || !locationType || !salary) {
      throw new BadRequestException('One of the required fields is missing')
    }
    return this.service.save(body)
  }

  @ApiOkResponse({ type: JobDto })
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<JobDto> {
    return this.service.findById(id)
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
    @Body() params: ApplyToJobDto,
  ): Promise<JobDto> {
    console.log('params', id, params.applicantId)
    return this.service.apply(id, params.applicantId)
  }
}
