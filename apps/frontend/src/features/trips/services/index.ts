import { api } from '@/lib/api';
import type { TripResponseDto, CreateTripDto, UpdateTripDto } from '@saas-template/core';

export const tripsService = {
  async getAll(): Promise<TripResponseDto[]> {
    const response = await api.get('/trips');
    return response.data;
  },

  async getById(id: string): Promise<TripResponseDto> {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  async create(data: CreateTripDto): Promise<TripResponseDto> {
    const response = await api.post('/trips', data);
    return response.data;
  },

  async update(id: string, data: UpdateTripDto): Promise<TripResponseDto> {
    const response = await api.put(`/trips/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/trips/${id}`);
  },
};
