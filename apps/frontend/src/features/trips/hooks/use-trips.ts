import type { CreateTripDto, UpdateTripDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tripsService } from '../services';

const TRIP_KEY = ['trips'];

export function useTrips() {
  return useQuery({
    queryKey: TRIP_KEY,
    queryFn: () => tripsService.getAll(),
  });
}

export function useTrip(id: string) {
  return useQuery({
    queryKey: [...TRIP_KEY, id],
    queryFn: () => tripsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTripDto) => tripsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEY });
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTripDto }) =>
      tripsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEY });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEY });
    },
  });
}
