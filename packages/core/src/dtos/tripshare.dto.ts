import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateTripshareDto {
  @IsUUID()
  tripId!: string;

  @IsUUID()
  userId!: string;
}

export class UpdateTripshareDto {
  @IsOptional()
  @IsUUID()
  tripId?: string | undefined;

  @IsOptional()
  @IsUUID()
  userId?: string | undefined;
}

export class TripshareResponseDto {
  id!: string;
  tripId!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
