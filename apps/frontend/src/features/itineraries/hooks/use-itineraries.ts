import type { CreateItineraryDto, UpdateItineraryDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { itinerariesService } from '../services';

const ITINERARY_KEY = ['itineraries'];

export function useItineraries() {
  return useQuery({
    queryKey: ITINERARY_KEY,
    queryFn: () => itinerariesService.getAll(),
  });
}

export function useItinerary(id: string) {
  return useQuery({
    queryKey: [...ITINERARY_KEY, id],
    queryFn: () => itinerariesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItineraryDto) => itinerariesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITINERARY_KEY });
    },
  });
}

export function useUpdateItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItineraryDto }) =>
      itinerariesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITINERARY_KEY });
    },
  });
}

export function useDeleteItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => itinerariesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITINERARY_KEY });
    },
  });
}
