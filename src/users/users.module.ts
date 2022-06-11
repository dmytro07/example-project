import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { CaslAbilityFactory } from 'src/auth/casl-abilibty.factory';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CaslAbilityFactory,
  ],
  imports: [SequelizeModule.forFeature([UserEntity])],
})
export class UsersModule {}
