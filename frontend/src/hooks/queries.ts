import { useQuery } from '@tanstack/react-query';
import { articlesApi, authorsApi, tagsApi, healthApi } from '../api/entities';
import { queryKeys } from '../api/queryKeys';

export function useArticles() {
  return useQuery({
    queryKey: queryKeys.articles.list(),
    queryFn: articlesApi.list,
  });
}

export function useTopAuthors() {
  return useQuery({
    queryKey: queryKeys.authors.list_top(),
    queryFn: authorsApi.list_top,
  });
}

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.list(),
    queryFn: tagsApi.list,
  });
}

export function useAuthors() {
  return useQuery({
    queryKey: queryKeys.authors.list(),
    queryFn: authorsApi.list,
  });
}

export function useHealth() {
  return useQuery({
    queryKey: queryKeys.health.status(),
    queryFn: healthApi.status,
    refetchInterval: 60000,
    staleTime: 60000,
  });
}
