import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoleType } from 'src/utils/constants';
import { Roles } from './roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PublicRoute } from './public-route.decorator';
import { AuthUserInterceptor } from 'src/interceptors/auth-user-interceptor.service';
// import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
