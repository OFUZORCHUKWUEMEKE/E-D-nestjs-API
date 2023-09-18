import { SetMetadata } from '@nestjs/common';
import { CustomerType } from '../dto/common-dto';

// import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles:CustomerType[]) => SetMetadata(ROLES_KEY, roles);