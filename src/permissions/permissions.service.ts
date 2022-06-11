import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { createRoleDto } from './dto/create-role-dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionsEntity } from './entities/role-permissions.entity';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(RoleEntity) private readonly roleEntity: typeof RoleEntity,
    @InjectModel(PermissionEntity)
    private readonly permissionEntity: typeof PermissionEntity,
    @InjectModel(RolePermissionsEntity)
    private readonly rolePermissionEntity: typeof RolePermissionsEntity,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, roleId: string) {
    const [permission] = await this.permissionEntity.findOrCreate({
      where: { ...createPermissionDto },
      defaults: {
        ...createPermissionDto,
      },
    });
    return this.rolePermissionEntity.create({
      permissionId: permission.id,
      roleId,
    });
  }

  createRole(createRoleDto: createRoleDto) {
    return this.roleEntity.create({ ...createRoleDto });
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
