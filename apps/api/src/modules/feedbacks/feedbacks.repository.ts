import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Feedback } from '@saas-template/database';
import type { CreateFeedbackDto, UpdateFeedbackDto } from '@saas-template/core';

@Injectable()
export class FeedbacksRepository extends Repository<Feedback> {
  constructor(private dataSource: DataSource) {
    super(Feedback, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Feedback[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Feedback | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.create({
      ...dto,
      userId,
    });
    return this.save(feedback);
  }

  async update(id: string, userId: string, dto: UpdateFeedbackDto): Promise<Feedback | null> {
    const feedback = await this.findById(id, userId);
    if (!feedback) {
      return null;
    }

    Object.assign(feedback, dto);
    return this.save(feedback);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const feedback = await this.findById(id, userId);
    if (!feedback) {
      return false;
    }

    await this.softRemove(feedback);
    return true;
  }
}
