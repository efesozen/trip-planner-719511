import type { CreateFeedbackDto, UpdateFeedbackDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { feedbacksService } from '../services';

const FEEDBACK_KEY = ['feedbacks'];

export function useFeedbacks() {
  return useQuery({
    queryKey: FEEDBACK_KEY,
    queryFn: () => feedbacksService.getAll(),
  });
}

export function useFeedback(id: string) {
  return useQuery({
    queryKey: [...FEEDBACK_KEY, id],
    queryFn: () => feedbacksService.getById(id),
    enabled: !!id,
  });
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeedbackDto) => feedbacksService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY });
    },
  });
}

export function useUpdateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeedbackDto }) =>
      feedbacksService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY });
    },
  });
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => feedbacksService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY });
    },
  });
}
