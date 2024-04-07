import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { plainToDto } from '../../common/helpers/plain-to-dto.helper'
import { RegisterUserDto, UpdateUserInputDto } from '../dtos/register-user.dto'
import { UserDto } from '../dtos/user.dto'
import { User, UserDocument } from '../schemas/user.schema'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  public async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.model.findOne({ email }).lean()
    return plainToDto<UserDocument, UserDto>(UserDto, user)
  }

  public async findById(id: string): Promise<UserDto> {
    const user = await this.model.findOne({ _id: id }).lean()
    return plainToDto<UserDocument, UserDto>(UserDto, user)
  }

  public async updateAccessCount(user: UserDto): Promise<void> {
    await this.model.updateOne(
      { _id: user.id },
      { accessCount: user.accessCount },
    )
  }

  public async create(user: RegisterUserDto): Promise<UserDto> {
    const userSaved = (await new this.model(user).save()).toJSON()
    return plainToDto<UserDocument, UserDto>(UserDto, userSaved)
  }

  public async update(
    userId: string,
    input: UpdateUserInputDto,
  ): Promise<void> {
    await this.model.updateOne({ _id: userId }, { ...input })
  }

  public async updateAppliedJob(user: UserDto, jobId: string): Promise<void> {
    await this.model.updateOne(
      { _id: user.id, jobsApplied: { $nin: jobId } },
      { $push: { jobsApplied: jobId } },
    )
  }

  public async saveResume(
    id: string,
    file: Express.Multer.File,
  ): Promise<void> {
    console.log('PASSED HEREEEEEE', { id, file })
    const { filename, path } = file

    await this.model.updateOne({ _id: id }, { resume: { filename, path } })
  }
}
