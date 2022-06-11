import { ForeignKey, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/shared/base.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Table({ tableName: 'RolePermissions' })
export class RolePermissionsEntity extends BaseEntity {
  @ForeignKey(() => RoleEntity)
  roleId: RoleEntity;

  @ForeignKey(() => PermissionEntity)
  permissionId: string;
}
