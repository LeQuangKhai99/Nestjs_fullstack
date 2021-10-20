import { IsNotEmpty, IsOptional } from "class-validator";
import { type } from "os";

export class ChangePasswordDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}
