import { UserRole } from "src/auth/dto/create.dto";
import { IsEnum } from "@nestjs/class-validator";

export class UpdateDto {
  username: string;

  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  pnumber: number;
}
