import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateFeedbackDto, FeedbackResponseDto, UpdateFeedbackDto } from '@saas-template/core';
import type { Feedback } from '@saas-template/database';
import { FeedbacksRepository } from './feedbacks.repository';

@Injectable()
export class FeedbacksService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<FeedbackResponseDto[]> {
    const feedbacks = await this.feedbacksRepository.findAll(userId);
    return feedbacks.map((feedback: Feedback) => this.toResponseDto(feedback));
  }

  async findOne(id: string, userId: string): Promise<FeedbackResponseDto> {
    const feedback = await this.feedbacksRepository.findById(id, userId);
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    return this.toResponseDto(feedback);
  }

  async create(userId: string, dto: CreateFeedbackDto): Promise<FeedbackResponseDto> {
    return this.uow.execute(async () => {
      const feedback = await this.feedbacksRepository.create(userId, dto);
      return this.toResponseDto(feedback);
    });
  }

  async update(id: string, userId: string, dto: UpdateFeedbackDto): Promise<FeedbackResponseDto> {
    return this.uow.execute(async () => {
      const feedback = await this.feedbacksRepository.update(id, userId, dto);
      if (!feedback) {
        throw new NotFoundException('Feedback not found');
      }
      return this.toResponseDto(feedback);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.feedbacksRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Feedback not found');
      }
    });
  }

  private toResponseDto(feedback: Feedback): FeedbackResponseDto {
    return {
      id: feedback.id,
      tripId: feedback.tripId,
      userId: feedback.userId,
      rating: feedback.rating,
      comment: feedback.comment,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    };
  }
}
