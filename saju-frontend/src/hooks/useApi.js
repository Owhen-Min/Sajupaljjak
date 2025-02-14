import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export const useGet = (uri, options = {}) => {
  return useQuery({
    queryKey: [uri],
    queryFn: async () => {
      const response = await apiClient.get(uri);
      return response.data;
    },
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
    onSuccess: (data) => {
      console.log("GET Response Data:", data);
      options.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("GET Error:", error);
      options.onError?.(error);
    },
  });
};

export const usePost = (options = {}) => {
  return useMutation({
    mutationFn: async ({ uri, payload, config = {} }) => {
      console.log("POST Request Payload:", payload);
      const response = await apiClient.post(uri, payload, config);
      return response.data;
    },
    ...options
  });
};

export const usePut = () => {
  return useMutation({
    mutationFn: async ({ uri, payload, config = {} }) => {
      console.log("PUT Request Payload:", payload);
      const response = await apiClient.put(uri, payload, config);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("PUT Response Data:", data);
    },
    onError: (error) => {
      console.error("PUT Error:", error);
    },
  });
};

export const useDelete = () => {
  return useMutation({
    mutationFn: async ({ uri, config = {} }) => {
      const response = await apiClient.delete(uri, config);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("DELETE Response Data:", data);
    },
    onError: (error) => {
      console.error("DELETE Error:", error);
    },
  });
};


export const usePatch = () => {
  return useMutation({
    mutationFn: async ({ uri, payload, config = {} }) => {
      const response = await apiClient.patch(uri, payload, config);
      return response.data;
    },
  });
};