import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateTripDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  startDate!: Date;

  @IsDate()
  endDate!: Date;
}

export class UpdateTripDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsDate()
  startDate?: Date | undefined;

  @IsOptional()
  @IsDate()
  endDate?: Date | undefined;
}

export class TripResponseDto {
  id!: string;
  userId!: string;
  title!: string;
  description?: string;
  startDate!: Date;
  endDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
