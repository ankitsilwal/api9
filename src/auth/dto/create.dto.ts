import { IsEnum } from "@nestjs/class-validator";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  VIEWER = "viewer",
}

export class CreateDto {
  username: string;

  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  pnumber: string;
}