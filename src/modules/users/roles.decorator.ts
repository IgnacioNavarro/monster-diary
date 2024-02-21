import { SetMetadata } from '@nestjs/common';
import { userRole } from './roles.enum';


export const ROLES_KEY = 'role';
export const Roles = (...roles: userRole[]) => SetMetadata(ROLES_KEY, roles);