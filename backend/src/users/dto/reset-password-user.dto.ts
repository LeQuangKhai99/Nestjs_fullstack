import { IsNotEmpty, IsOptional } from "class-validator";
import { type } from "os";

export class ResetPasswordDto {
  @IsNotEmpty()
  ids: number[];
}
