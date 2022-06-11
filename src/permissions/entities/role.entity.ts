import { BelongsToMany, Column, HasMany, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/shared/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { PermissionEntity } from './permission.entity';
import { RolePermissionsEntity } from './role-permissions.entity';

@Table({ tableName: 'Roles' })
export class RoleEntity extends BaseEntity {
  @Column
  role: string;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  @BelongsToMany(() => PermissionEntity, () => RolePermissionsEntity)
  permissions: PermissionEntity[];
}
