// src/common/guards/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './../../decorators/public/public.decorator';
import { Request } from 'express';
import { JwtService } from '../../../auth/jwt/jwt.service';
export interface JwtUserPayload {
  id: string;
  email: string;
  name: string;
  profilePicture: string;
}

// Extend Express Request to include optional user
export type AuthRequest = Request & { user?: JwtUserPayload };
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Check metadata: is route public?
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const authHeader: string = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    const payload = this.jwtService.verifyToken<{
      id: string;
      email: string;
      name: string;
      profilePicture: string;
    }>(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    req.user = payload;

    return true;
  }
}
