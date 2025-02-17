import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export const useGet = (uri, options = {}) => {
  return useQuery({
    queryKey: [uri],
    queryFn: async () => {
      const response = await apiClient.get(uri);
      return response.data;
    },
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

export const usePost = (uri, options = {}) => {
  return useMutation({
    mutationFn: async (params) => {
      const requestUri = params.uri || uri;
      const payload = params.payload || params;

      if (!requestUri) {
        throw new Error('URI is required');
      }

      console.log("POST Request Payload:", payload);
      const response = await apiClient.post(requestUri, payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("POST Response Data:", data);
      options.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("POST Error:", error);
      options.onError?.(error);
    },
  });
};

export const usePut = () => {
  return useMutation({
    mutationFn: async ({ uri, payload = {} }) => {
      console.log("PUT Request Payload:", payload);
      const response = await apiClient.put(uri, payload);
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
    mutationFn: async ({ uri }) => {
      const response = await apiClient.delete(uri);
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
    mutationFn: async ({ uri, payload = {} }) => {
      console.log("PATCH Request Payload:", payload);
      const response = await apiClient.patch(uri, payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("PATCH Response Data:", data);
    },
    onError: (error) => {
      console.error("PATCH Error:", error);
    },
  });
};
