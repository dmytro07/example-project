import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ArticleEntity } from 'src/articles/entities/article.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ALL = 'all',
}
export type PermissionEntity =
  | InferSubjects<typeof ArticleEntity | typeof UserEntity>
  | 'all';
export type AppAbility = Ability<[PermissionAction, PermissionEntity]>;

@Injectable()
export class CaslAbilityFactory {
  constructor() {}
  async createForUser(user: UserEntity): Promise<AppAbility> {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[PermissionAction, PermissionEntity]>
    >(Ability as AbilityClass<AppAbility>);

    user.role.permissions.map((el) => {
      can(el.action, this.getEntity(el.entity));
      can(PermissionAction.READ, this.getEntity(el.entity), {
        createdBy: user.id,
      });
    });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<PermissionEntity>,
    });
  }

  private getEntity(name: string) {
    return {
      ['Article']: ArticleEntity,
      ['User']: UserEntity,
    }[name];
  }
}
