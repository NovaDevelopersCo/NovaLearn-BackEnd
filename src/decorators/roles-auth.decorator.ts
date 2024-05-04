import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'

export const RolesLevel_access = (level_access: number) =>
    SetMetadata(ROLES_KEY, level_access)
