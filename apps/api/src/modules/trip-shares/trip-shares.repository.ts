import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tripshare } from '@saas-template/database';
import type { CreateTripshareDto, UpdateTripshareDto } from '@saas-template/core';

@Injectable()
export class TripsharesRepository extends Repository<Tripshare> {
  constructor(private dataSource: DataSource) {
    super(Tripshare, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Tripshare[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Tripshare | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateTripshareDto): Promise<Tripshare> {
    const tripshare = this.create({
      ...dto,
      userId,
    });
    return this.save(tripshare);
  }

  async update(id: string, userId: string, dto: UpdateTripshareDto): Promise<Tripshare | null> {
    const tripshare = await this.findById(id, userId);
    if (!tripshare) {
      return null;
    }

    Object.assign(tripshare, dto);
    return this.save(tripshare);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const tripshare = await this.findById(id, userId);
    if (!tripshare) {
      return false;
    }

    await this.softRemove(tripshare);
    return true;
  }
}
