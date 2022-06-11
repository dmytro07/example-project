import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { UserEntity } from 'src/users/entities/user.entity';

export class BaseEntity extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.UUID })
  createdBy: string;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
