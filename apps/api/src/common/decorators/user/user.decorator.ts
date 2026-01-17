import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return data ? req.user?.[data as keyof typeof req.user] : req.user;
  },
);
