import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Itinerary } from '@saas-template/database';
import type { CreateItineraryDto, UpdateItineraryDto } from '@saas-template/core';

@Injectable()
export class ItinerarysRepository extends Repository<Itinerary> {
  constructor(private dataSource: DataSource) {
    super(Itinerary, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Itinerary[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Itinerary | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateItineraryDto): Promise<Itinerary> {
    const itinerary = this.create({
      ...dto,
      userId,
    });
    return this.save(itinerary);
  }

  async update(id: string, userId: string, dto: UpdateItineraryDto): Promise<Itinerary | null> {
    const itinerary = await this.findById(id, userId);
    if (!itinerary) {
      return null;
    }

    Object.assign(itinerary, dto);
    return this.save(itinerary);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const itinerary = await this.findById(id, userId);
    if (!itinerary) {
      return false;
    }

    await this.softRemove(itinerary);
    return true;
  }
}
