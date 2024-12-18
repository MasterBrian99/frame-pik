import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
// import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import type { RoleType } from '../utils/role-type';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthUserInterceptor } from 'src/interceptors/auth-user-interceptor.service';
import { PublicRoute } from './public-route.decorator';
import { Roles } from './roles.decorator';

export function Auth(
  roles: RoleType[] = [],
  options?: Partial<{ public: boolean }>,
): MethodDecorator {
  const isPublicRoute = options?.public;

  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard({ public: isPublicRoute }), RolesGuard),
    // ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    PublicRoute(isPublicRoute),
  );
}
