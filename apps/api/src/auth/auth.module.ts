import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/user/utils/hash.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, HashService],
})
export class AuthModule {}
