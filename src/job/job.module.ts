import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../user/user.module'
import { JobController } from './controllers/job.controller'
import { JobRepository } from './repositories/job.repository'
import { Job, JobSchema } from './schemas/job.schema'
import { JobService } from './services/job.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    UserModule,
  ],
  providers: [JobService, JobRepository],
  controllers: [JobController],
})
export class JobModule {}
