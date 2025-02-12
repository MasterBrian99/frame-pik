import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../integrations/database/entity/user.entity';
import { ContextProvider } from '../../integrations/providers/context.provider';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const user = request.user as UserEntity;
    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}
