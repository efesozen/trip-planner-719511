import { api } from '@/lib/api';
import type { FeedbackResponseDto, CreateFeedbackDto, UpdateFeedbackDto } from '@saas-template/core';

export const feedbacksService = {
  async getAll(): Promise<FeedbackResponseDto[]> {
    const response = await api.get('/feedbacks');
    return response.data;
  },

  async getById(id: string): Promise<FeedbackResponseDto> {
    const response = await api.get(`/feedbacks/${id}`);
    return response.data;
  },

  async create(data: CreateFeedbackDto): Promise<FeedbackResponseDto> {
    const response = await api.post('/feedbacks', data);
    return response.data;
  },

  async update(id: string, data: UpdateFeedbackDto): Promise<FeedbackResponseDto> {
    const response = await api.put(`/feedbacks/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/feedbacks/${id}`);
  },
};
