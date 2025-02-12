import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export const useInfiniteGet = (uri, queryParams = {}, options = {}) => {
  return useInfiniteQuery({
    queryKey: [uri, queryParams],
    queryFn: async ({ pageParam = null }) => {
      const response = await apiClient.get(uri, {
        params: { ...queryParams, cursor: pageParam },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? null;
    },
    ...options,
  });
};
