import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { UserRepository } from './repositories/user.repository'
import { User, UserSchema } from './schemas/user.schema'
import { SharedModule } from '../shared/shared.module'
import { FileStorageModule } from './modules/user.file.storage.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
    FileStorageModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
