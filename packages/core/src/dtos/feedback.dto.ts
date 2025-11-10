import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsUUID()
  tripId!: string;

  @IsUUID()
  userId!: string;

  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class UpdateFeedbackDto {
  @IsOptional()
  @IsUUID()
  tripId?: string | undefined;

  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsNumber()
  rating?: number | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  comment?: string | undefined;
}

export class FeedbackResponseDto {
  id!: string;
  tripId!: string;
  userId!: string;
  rating!: number;
  comment?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
