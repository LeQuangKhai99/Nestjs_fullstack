import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  manage: User;
}
