import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import {
  RegisterUserInputDto,
  UpdateUserInputDto,
  UserWithTokensOutputDto,
} from '../dtos/register-user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ description: 'Register a new user' })
  @ApiCreatedResponse({ type: UserWithTokensOutputDto })
  @Post()
  public create(
    @Body() input: RegisterUserInputDto,
  ): Promise<UserWithTokensOutputDto> {
    return this.service.register(input);
  }

  @ApiOperation({ description: 'Update a user' })
  @ApiCreatedResponse({ type: UserWithTokensOutputDto })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() input: UpdateUserInputDto,
  ): Promise<void> {
    await this.service.update(id, input);
  }
}
