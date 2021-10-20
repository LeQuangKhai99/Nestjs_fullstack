import { Role } from './../../roles/entities/role.entity';
import { Department } from './../../departments/entities/department.entity';
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  gender: boolean;

  @IsNotEmpty()
  joinCompanyAt: Date;

  @IsNotEmpty()
  macAddress: string;

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  constract: string;

  @IsNotEmpty()
  device: string;

  @IsOptional()
  department: Department;

  @IsOptional()
  role: Role;
}
