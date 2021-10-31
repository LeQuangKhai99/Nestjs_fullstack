import { IsNotEmpty } from 'class-validator';
export class CreateRequestDto {
  @IsNotEmpty()
  kind: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  startAt: Date;

  @IsNotEmpty()
  endAt: Date;
}
