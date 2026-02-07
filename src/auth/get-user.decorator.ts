import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from './user.interface';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserInterface => {
    const req = ctx.switchToHttp().getRequest<{ user: UserInterface }>();
    return req.user;
  },
);
