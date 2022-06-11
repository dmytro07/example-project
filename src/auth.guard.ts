import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ArticleEntity } from './articles/entities/article.entity';
import {
  CaslAbilityFactory,
  PermissionAction,
} from './auth/casl-abilibty.factory';
import { CHECK_POLICIES_KEY } from './auth/check-policies.decorator';
import { PolicyHandler } from './auth/policy-handler';
import { PermissionEntity } from './permissions/entities/permission.entity';
import { RolePermissionsEntity } from './permissions/entities/role-permissions.entity';
import { RoleEntity } from './permissions/entities/role.entity';
import { UserEntity } from './users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(UserEntity) private readonly userEntity: typeof UserEntity,
    private readonly caslFactory: CaslAbilityFactory,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const auth = req.headers.authorization;

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const user = await this.userEntity.findByPk(auth, {
      include: [{ model: RoleEntity, include: [PermissionEntity] }],
    });
    const ability = await this.caslFactory.createForUser(user);
    req['user'] = user;
    return policyHandlers.every((handler) => handler(ability));
  }
}
