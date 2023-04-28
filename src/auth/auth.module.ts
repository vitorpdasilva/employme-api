import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
