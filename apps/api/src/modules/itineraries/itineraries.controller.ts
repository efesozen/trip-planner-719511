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
import type { CreateItineraryDto, ItineraryResponseDto, UpdateItineraryDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItinerarysService } from './itineraries.service';

@Controller('itineraries')
@UseGuards(JwtAuthGuard)
export class ItinerarysController {
  constructor(private readonly itinerarysService: ItinerarysService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ItineraryResponseDto[]> {
    return this.itinerarysService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ItineraryResponseDto> {
    return this.itinerarysService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateItineraryDto,
    @CurrentUser() user: User
  ): Promise<ItineraryResponseDto> {
    return this.itinerarysService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateItineraryDto,
    @CurrentUser() user: User
  ): Promise<ItineraryResponseDto> {
    return this.itinerarysService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.itinerarysService.remove(id, user.id);
  }
}
