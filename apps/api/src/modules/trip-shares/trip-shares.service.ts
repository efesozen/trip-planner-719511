import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTripshareDto, TripshareResponseDto, UpdateTripshareDto } from '@saas-template/core';
import type { Tripshare } from '@saas-template/database';
import { TripsharesRepository } from './tripshares.repository';

@Injectable()
export class TripsharesService {
  constructor(
    private readonly tripsharesRepository: TripsharesRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<TripshareResponseDto[]> {
    const tripshares = await this.tripsharesRepository.findAll(userId);
    return tripshares.map((tripshare: Tripshare) => this.toResponseDto(tripshare));
  }

  async findOne(id: string, userId: string): Promise<TripshareResponseDto> {
    const tripshare = await this.tripsharesRepository.findById(id, userId);
    if (!tripshare) {
      throw new NotFoundException('Tripshare not found');
    }
    return this.toResponseDto(tripshare);
  }

  async create(userId: string, dto: CreateTripshareDto): Promise<TripshareResponseDto> {
    return this.uow.execute(async () => {
      const tripshare = await this.tripsharesRepository.create(userId, dto);
      return this.toResponseDto(tripshare);
    });
  }

  async update(id: string, userId: string, dto: UpdateTripshareDto): Promise<TripshareResponseDto> {
    return this.uow.execute(async () => {
      const tripshare = await this.tripsharesRepository.update(id, userId, dto);
      if (!tripshare) {
        throw new NotFoundException('Tripshare not found');
      }
      return this.toResponseDto(tripshare);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.tripsharesRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Tripshare not found');
      }
    });
  }

  private toResponseDto(tripshare: Tripshare): TripshareResponseDto {
    return {
      id: tripshare.id,
      tripId: tripshare.tripId,
      userId: tripshare.userId,
      createdAt: tripshare.createdAt,
      updatedAt: tripshare.updatedAt,
    };
  }
}
