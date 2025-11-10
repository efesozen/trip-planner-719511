import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Trip } from '@saas-template/database';
import type { CreateTripDto, UpdateTripDto } from '@saas-template/core';

@Injectable()
export class TripsRepository extends Repository<Trip> {
  constructor(private dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Trip[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Trip | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateTripDto): Promise<Trip> {
    const trip = this.create({
      ...dto,
      userId,
    });
    return this.save(trip);
  }

  async update(id: string, userId: string, dto: UpdateTripDto): Promise<Trip | null> {
    const trip = await this.findById(id, userId);
    if (!trip) {
      return null;
    }

    Object.assign(trip, dto);
    return this.save(trip);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const trip = await this.findById(id, userId);
    if (!trip) {
      return false;
    }

    await this.softRemove(trip);
    return true;
  }
}
