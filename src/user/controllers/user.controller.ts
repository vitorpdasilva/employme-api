import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import {
  RegisterUserInputDto,
  RegisterUserOutputDto,
} from '../dtos/register-user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ description: 'Register a new user' })
  @ApiCreatedResponse({ type: RegisterUserOutputDto })
  @Post()
  public create(
    @Body() input: RegisterUserInputDto,
  ): Promise<RegisterUserOutputDto> {
    return this.service.register(input);
  }
}
