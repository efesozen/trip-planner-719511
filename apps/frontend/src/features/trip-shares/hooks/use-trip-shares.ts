import type { CreateTripshareDto, UpdateTripshareDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tripsharesService } from '../services';

const TRIPSHARE_KEY = ['tripshares'];

export function useTripshares() {
  return useQuery({
    queryKey: TRIPSHARE_KEY,
    queryFn: () => tripsharesService.getAll(),
  });
}

export function useTripshare(id: string) {
  return useQuery({
    queryKey: [...TRIPSHARE_KEY, id],
    queryFn: () => tripsharesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTripshare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTripshareDto) => tripsharesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPSHARE_KEY });
    },
  });
}

export function useUpdateTripshare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTripshareDto }) =>
      tripsharesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPSHARE_KEY });
    },
  });
}

export function useDeleteTripshare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripsharesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPSHARE_KEY });
    },
  });
}
