import { api } from '@/lib/api';
import type { ItineraryResponseDto, CreateItineraryDto, UpdateItineraryDto } from '@saas-template/core';

export const itinerariesService = {
  async getAll(): Promise<ItineraryResponseDto[]> {
    const response = await api.get('/itineraries');
    return response.data;
  },

  async getById(id: string): Promise<ItineraryResponseDto> {
    const response = await api.get(`/itineraries/${id}`);
    return response.data;
  },

  async create(data: CreateItineraryDto): Promise<ItineraryResponseDto> {
    const response = await api.post('/itineraries', data);
    return response.data;
  },

  async update(id: string, data: UpdateItineraryDto): Promise<ItineraryResponseDto> {
    const response = await api.put(`/itineraries/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/itineraries/${id}`);
  },
};
