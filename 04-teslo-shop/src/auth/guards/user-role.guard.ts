import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector //!obtener la metadata de los decoradores
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get('roles', context.getHandler())

    if(!validRoles) return true; //? si no hay roles, entonces no hay restricciones
    if(validRoles.length === 0) return true; //? si no hay roles, entonces no hay restricciones

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('No user found');

    for (const role of user.roles) {
      if(validRoles.includes(role)) return true;
    }

   throw new ForbiddenException(`User ${user.fullName} needs to have one of these roles: ${validRoles.join(', ')}`);
  }
}
