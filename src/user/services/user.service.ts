import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { plainToDto } from '../../common/helpers/plain-to-dto.helper'
import { TokenService } from '../../shared/services/token.service'
import { UserRepository } from '../repositories/user.repository'
import {
  RegisterUserDto,
  RegisterUserInputDto,
  UpdateUserInputDto,
  UserWithTokensOutputDto,
} from '../dtos/register-user.dto'
import { UserDto } from '../dtos/user.dto'
import { UserType } from '../enums/user.enum'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async findByEmail(email: string) {
    const user = await this.repository.findOneByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  public async findById(id: string) {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  public async register(
    userInput: RegisterUserInputDto,
  ): Promise<UserWithTokensOutputDto> {
    try {
      const { email, password, name, userType = UserType.CANDIDATE } = userInput
      const userFound = await this.repository.findOneByEmail(email)
      if (userFound) {
        throw new ConflictException('User already exists')
      }
      const user: RegisterUserDto = {
        email,
        name,
        userType,
        passwordHash: bcrypt.hashSync(password, 9),
      }
      const userSaved = await this.repository.create(user)

      const tokens = await this.tokenService.generate({
        email: userSaved.email,
        sub: userSaved.id,
      })
      const response = {
        userData: userSaved,
        tokens,
      }
      return plainToDto(UserWithTokensOutputDto, response)
    } catch (error) {
      console.log('error', error)
    }
  }

  public async update(
    id: string,
    userInput: UpdateUserInputDto,
  ): Promise<UserWithTokensOutputDto> {
    const userFound = await this.repository.findById(id)
    if (!userFound) {
      throw new NotFoundException('User not exists')
    }
    await this.repository.update(id, userInput)

    const tokens = await this.tokenService.generate({
      email: userFound.email,
      sub: userFound.id,
    })

    return {
      userData: {
        ...userFound,
        ...userInput,
      },
      tokens,
    }
  }

  public async increaseAccessCount(user: UserDto): Promise<UserDto> {
    user.accessCount += 1
    await this.repository.updateAccessCount(user)
    return user
  }

  public async updateAppliedJob(user: UserDto, jobId: string): Promise<void> {
    await this.repository.updateAppliedJob(user, jobId)
  }

  public async saveResume(
    id: string,
    resume: Express.Multer.File,
  ): Promise<void> {
    console.log('user.service', 'saveResume', resume)
    await this.repository.saveResume(id, resume)
  }
}
