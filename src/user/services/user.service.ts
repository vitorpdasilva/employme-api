import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToDto } from '../../common/helpers/plain-to-dto.helper';
import { TokenService } from '../../shared/services/token.service';
import { UserRepository } from '../repositories/user.repository';
import {
  RegisterUserDto,
  RegisterUserInputDto,
  UserWithTokensOutputDto,
} from '../dtos/register-user.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async findByEmail(email: string) {
    const user = await this.repository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async findById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async register(
    userInput: RegisterUserInputDto,
  ): Promise<UserWithTokensOutputDto> {
    const { email, password } = userInput;
    const userFound = await this.repository.findOneByEmail(email);
    if (userFound) {
      throw new ConflictException('User already exists');
    }
    const user: RegisterUserDto = {
      email: userInput.email,
      passwordHash: bcrypt.hashSync(password, 9),
    };
    const userSaved = await this.repository.create(user);
    const tokens = await this.tokenService.generate({
      email: userSaved.email,
      sub: userSaved.id,
    });
    const response = {
      userData: userSaved,
      tokens,
    };
    return plainToDto(UserWithTokensOutputDto, response);
  }

  public async increaseAccessCount(user: UserDto): Promise<UserDto> {
    user.accessCount += 1;
    await this.repository.updateAccessCount(user);
    return user;
  }

  public async updateAppliedJob(user: UserDto, jobId: string): Promise<void> {
    await this.repository.updateAppliedJob(user, jobId);
  }
}
