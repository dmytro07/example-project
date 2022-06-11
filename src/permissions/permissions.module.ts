import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { RoleEntity } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionsEntity } from './entities/role-permissions.entity';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    SequelizeModule.forFeature([
      RoleEntity,
      PermissionEntity,
      RolePermissionsEntity,
    ]),
  ],
})
export class PermissionsModule {}
