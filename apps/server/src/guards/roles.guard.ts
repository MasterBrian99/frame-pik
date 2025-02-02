import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from 'src/database/entity/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleType } from 'src/utils/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<(typeof RoleType)[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('current user role', user.role);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
