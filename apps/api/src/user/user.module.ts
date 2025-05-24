import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService } from 'src/user/utils/hash.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService, HashService],
})
export class UserModule {}
