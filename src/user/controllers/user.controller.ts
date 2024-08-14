import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  RegisterUserInputDto,
  UpdateUserInputDto,
  UserWithTokensOutputDto,
} from '../dtos/register-user.dto'
import { UserService } from '../services/user.service'

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
    return this.service.register(input)
  }

  @ApiOperation({ description: 'Update a user' })
  @ApiCreatedResponse({ type: UserWithTokensOutputDto })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() input: UpdateUserInputDto,
  ): Promise<UserWithTokensOutputDto> {
    return await this.service.update(id, input)
  }

  @ApiOperation({ description: 'Upload user resume' })
  @ApiCreatedResponse({ type: UserWithTokensOutputDto })
  @Post(':id/resume')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadResume(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    console.log('user.controller', 'id/resume', file)
    await this.service.saveResume(id, file)
  }

  // @ApiOperation({ description: 'Get User Resume' })
  // @ApiCreatedResponse({ type: String })
  // @Get(':id/resume')
  // @Header('Content-Type', 'application/json')
  // @Header('Content-Disposition', 'attachment; filename="resume.pdf"')
  // public async getFile(): Promise<string> {
  //   // return this.service.getFile()
  //   return await Promise.resolve('temp-file')
  // }
}
