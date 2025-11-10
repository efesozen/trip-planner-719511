import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTripDto, TripResponseDto, UpdateTripDto } from '@saas-template/core';
import type { Trip } from '@saas-template/database';
import { TripsRepository } from './trips.repository';

@Injectable()
export class TripsService {
  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<TripResponseDto[]> {
    const trips = await this.tripsRepository.findAll(userId);
    return trips.map((trip: Trip) => this.toResponseDto(trip));
  }

  async findOne(id: string, userId: string): Promise<TripResponseDto> {
    const trip = await this.tripsRepository.findById(id, userId);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    return this.toResponseDto(trip);
  }

  async create(userId: string, dto: CreateTripDto): Promise<TripResponseDto> {
    return this.uow.execute(async () => {
      const trip = await this.tripsRepository.create(userId, dto);
      return this.toResponseDto(trip);
    });
  }

  async update(id: string, userId: string, dto: UpdateTripDto): Promise<TripResponseDto> {
    return this.uow.execute(async () => {
      const trip = await this.tripsRepository.update(id, userId, dto);
      if (!trip) {
        throw new NotFoundException('Trip not found');
      }
      return this.toResponseDto(trip);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.tripsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Trip not found');
      }
    });
  }

  private toResponseDto(trip: Trip): TripResponseDto {
    return {
      id: trip.id,
      userId: trip.userId,
      title: trip.title,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt,
    };
  }
}
