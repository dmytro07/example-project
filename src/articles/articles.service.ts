import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(ArticleEntity)
    private readonly articleEntity: typeof ArticleEntity,
  ) {}
  create(createArticleDto: CreateArticleDto, userId: string) {
    return this.articleEntity.create({
      ...createArticleDto,
      createdBy: userId,
    });
  }

  findAll() {
    return this.articleEntity.findAll();
  }

  findOne(id: string) {
    return this.articleEntity.findByPk(id);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleEntity.update(
      { ...updateArticleDto },
      {
        where: {
          id,
        },
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
