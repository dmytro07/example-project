import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { RoleEntity } from 'src/permissions/entities/role.entity';
import { BaseEntity } from 'src/shared/base.entity';

@Table({ tableName: 'Users' })
export class UserEntity extends BaseEntity {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @ForeignKey(() => RoleEntity)
  roleid: string;

  @BelongsTo(() => RoleEntity)
  role: RoleEntity;
}
