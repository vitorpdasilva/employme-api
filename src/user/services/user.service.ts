import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import {
  RegisterUserDto,
  RegisterUserInputDto,
} from '../dtos/register-user.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async findByEmail(email: string) {
    const user = await this.repository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async register(userInput: RegisterUserInputDto): Promise<UserDto> {
    const { email, password } = userInput;
    const userFound = await this.repository.findOneByEmail(email);
    if (userFound) {
      throw new ConflictException('User already exists');
    }
    const user: RegisterUserDto = {
      email: userInput.email,
      passwordHash: bcrypt.hashSync(password, 9),
    };
    return this.repository.create(user);
  }

  public async increaseAccessCount(user: UserDto): Promise<UserDto> {
    user.accessCount += 1;
    await this.repository.updateAccessCount(user);
    return user;
  }
}
