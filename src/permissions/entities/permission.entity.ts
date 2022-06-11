import { BelongsToMany, Column, Table } from 'sequelize-typescript';
import { PermissionAction } from 'src/auth/casl-abilibty.factory';
import { BaseEntity } from 'src/shared/base.entity';
import { RolePermissionsEntity } from './role-permissions.entity';
import { RoleEntity } from './role.entity';

@Table({ tableName: 'Permissions' })
export class PermissionEntity extends BaseEntity {
  @Column
  action: PermissionAction;

  @Column
  entity: string;

  @BelongsToMany(() => RoleEntity, () => RolePermissionsEntity)
  roles: RoleEntity[];
}
