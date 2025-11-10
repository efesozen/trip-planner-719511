import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateItineraryDto, ItineraryResponseDto, UpdateItineraryDto } from '@saas-template/core';
import type { Itinerary } from '@saas-template/database';
import { ItinerarysRepository } from './itineraries.repository';

@Injectable()
export class ItinerarysService {
  constructor(
    private readonly itinerarysRepository: ItinerarysRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ItineraryResponseDto[]> {
    const itineraries = await this.itinerarysRepository.findAll(userId);
    return itineraries.map((itinerary: Itinerary) => this.toResponseDto(itinerary));
  }

  async findOne(id: string, userId: string): Promise<ItineraryResponseDto> {
    const itinerary = await this.itinerarysRepository.findById(id, userId);
    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }
    return this.toResponseDto(itinerary);
  }

  async create(userId: string, dto: CreateItineraryDto): Promise<ItineraryResponseDto> {
    return this.uow.execute(async () => {
      const itinerary = await this.itinerarysRepository.create(userId, dto);
      return this.toResponseDto(itinerary);
    });
  }

  async update(id: string, userId: string, dto: UpdateItineraryDto): Promise<ItineraryResponseDto> {
    return this.uow.execute(async () => {
      const itinerary = await this.itinerarysRepository.update(id, userId, dto);
      if (!itinerary) {
        throw new NotFoundException('Itinerary not found');
      }
      return this.toResponseDto(itinerary);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.itinerarysRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Itinerary not found');
      }
    });
  }

  private toResponseDto(itinerary: Itinerary): ItineraryResponseDto {
    return {
      id: itinerary.id,
      tripId: itinerary.tripId,
      date: itinerary.date,
      activities: itinerary.activities,
      createdAt: itinerary.createdAt,
      updatedAt: itinerary.updatedAt,
    };
  }
}
