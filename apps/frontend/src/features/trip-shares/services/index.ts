import { api } from '@/lib/api';
import type { TripshareResponseDto, CreateTripshareDto, UpdateTripshareDto } from '@saas-template/core';

export const tripsharesService = {
  async getAll(): Promise<TripshareResponseDto[]> {
    const response = await api.get('/tripshares');
    return response.data;
  },

  async getById(id: string): Promise<TripshareResponseDto> {
    const response = await api.get(`/tripshares/${id}`);
    return response.data;
  },

  async create(data: CreateTripshareDto): Promise<TripshareResponseDto> {
    const response = await api.post('/tripshares', data);
    return response.data;
  },

  async update(id: string, data: UpdateTripshareDto): Promise<TripshareResponseDto> {
    const response = await api.put(`/tripshares/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tripshares/${id}`);
  },
};
