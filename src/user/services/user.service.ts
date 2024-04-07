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
      const { email, password, name } = userInput
      const userFound = await this.repository.findOneByEmail(email)
      if (userFound) {
        throw new ConflictException('User already exists')
      }
      const user: RegisterUserDto = {
        email,
        name,
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

  public async update(id: string, userInput: UpdateUserInputDto): Promise<any> {
    const userFound = await this.repository.findById(id)
    if (!userFound) {
      throw new NotFoundException('User not exists')
    }
    await this.repository.update(id, userInput)
    // todo: fix this for the god's sake
    return {
      userData: {
        ...userFound,
        ...userInput,
      },
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

  public async saveResume(id, resume: Express.Multer.File): Promise<any> {
    console.warn('====', 'passed here', '====')
    await this.repository.saveResume(id, resume)
  }
}
