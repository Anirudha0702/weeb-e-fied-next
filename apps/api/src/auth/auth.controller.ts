import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() credentials: Prisma.UserCreateInput) {
    return this.authService.signup(credentials);
  }
}
