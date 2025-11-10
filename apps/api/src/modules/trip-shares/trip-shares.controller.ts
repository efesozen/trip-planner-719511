import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateTripshareDto, TripshareResponseDto, UpdateTripshareDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TripsharesService } from './tripshares.service';

@Controller('tripshares')
@UseGuards(JwtAuthGuard)
export class TripsharesController {
  constructor(private readonly tripsharesService: TripsharesService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<TripshareResponseDto[]> {
    return this.tripsharesService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<TripshareResponseDto> {
    return this.tripsharesService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateTripshareDto,
    @CurrentUser() user: User
  ): Promise<TripshareResponseDto> {
    return this.tripsharesService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTripshareDto,
    @CurrentUser() user: User
  ): Promise<TripshareResponseDto> {
    return this.tripsharesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.tripsharesService.remove(id, user.id);
  }
}
