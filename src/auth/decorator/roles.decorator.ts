import { SetMetadata } from "@nestjs/common"
import { UserRole } from "../dto/create.dto"
export const UserRoles =(...roles :UserRole[])=>SetMetadata("roles", roles)