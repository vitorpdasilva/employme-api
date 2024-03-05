import { OmitType } from '@nestjs/swagger'
import { JobDto } from './job.dto'

export class RegisterJobInputDto extends OmitType(JobDto, ['id']) {}
