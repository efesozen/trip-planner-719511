import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateItineraryDto {
  @IsUUID()
  tripId!: string;

  @IsDate()
  date!: Date;

  @IsOptional()
  activities?: Record<string, unknown>;
}

export class UpdateItineraryDto {
  @IsOptional()
  @IsUUID()
  tripId?: string | undefined;

  @IsOptional()
  @IsDate()
  date?: Date | undefined;

  @IsOptional()
  @IsOptional()
  activities?: Record<string, unknown> | undefined;
}

export class ItineraryResponseDto {
  id!: string;
  tripId!: string;
  date!: Date;
  activities?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
