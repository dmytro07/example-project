import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { AppAbility, PermissionAction } from 'src/auth/casl-abilibty.factory';
import { CheckPolicies } from 'src/auth/check-policies.decorator';
import { Ability, User } from 'src/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @CheckPolicies((abilibty) =>
    abilibty.can(PermissionAction.CREATE, ArticleEntity),
  )
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @User() user: UserEntity) {
    return this.articlesService.create(createArticleDto, user.id);
  }

  @CheckPolicies((abilibty) =>
    abilibty.can(PermissionAction.READ, ArticleEntity),
  )
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Ability() ability: AppAbility) {
    const article = await this.articlesService.findOne(id);
    if (!ability.can(PermissionAction.READ, article)) {
      throw new ForbiddenException();
    }
    return article;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
