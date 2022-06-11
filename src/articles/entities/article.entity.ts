import { Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/shared/base.entity';

@Table({ tableName: 'Articles' })
export class ArticleEntity extends BaseEntity {
  @Column
  title: string;

  @Column
  content: string;
}
