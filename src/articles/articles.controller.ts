import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionAction } from 'src/auth/casl-abilibty.factory';
import { CheckPolicies } from 'src/auth/check-policies.decorator';
import { User } from 'src/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @CheckPolicies((abilibty) => abilibty.can(PermissionAction.CREATE, 'Article'))
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @User() user: UserEntity) {
    return this.articlesService.create(createArticleDto, user.id);
  }

  @CheckPolicies((abilibty) => abilibty.can(PermissionAction.READ, 'Article'))
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
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
