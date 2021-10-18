import { IsNotEmpty, IsOptional } from "class-validator";

export class ActiveUserDto {
  @IsOptional()
  email: string;

  @IsOptional()
  token: string;

  @IsOptional()
  id: number;
}
