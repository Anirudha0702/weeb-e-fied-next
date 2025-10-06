import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly user: UserService) {}

  async signup(credentials: Prisma.UserCreateInput) {
    if (!credentials || Object.keys(credentials).length === 0) {
      throw new HttpException('Body is required', HttpStatus.BAD_REQUEST);
    }
    return this.user.create(credentials);
  }
}
