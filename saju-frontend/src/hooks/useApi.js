import { useQuery, useMutation } from "react-query";
import apiClient from "../api/apiClient";

export const useGet = (uri, options = {}) => {
  return useQuery(
    [uri], //쿼리 키
    async () => {
      const response = await apiClient.get(uri);
      return response;
    },
    {
      ...options,
      onSuccess: (response) => {
        console.log("GET Response Data:", response.data);
        console.log("GET Response Status:", response.status);
      },
      onError: (error) => {
        console.error("GET Error:", error);
      },
    }
  );
};

export const usePost = () => {
  return useMutation(
    async ({ uri, payload, config = {} }) => {
			console.log("POST Request Payload:", payload);
      const response = await apiClient.post(uri, payload, config);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log("POST Response Data:", response.data);
        console.log("POST Response Status:", response.status);
      },
      onError: (error) => {
        console.error("POST Error:", error);
      },
    }
  );
};


export const usePut = () => {
  return useMutation(
    async ({ uri, payload, config = {} }) => {
			console.log("PUT Request Payload:", payload);
      const response = await apiClient.put(uri, payload, config);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log("PUT Response Data:", response.data);
        console.log("PUT Response Status:", response.status);
      },
      onError: (error) => {
        console.error("PUT Error:", error);
      },
    }
  );
};


export const useDelete = () => {
  return useMutation(
    async ({ uri, config = {} }) => {
      const response = await apiClient.delete(uri, config);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log("DELETE Response Data:", response.data);
        console.log("DELETE Response Status:", response.status);
      },
      onError: (error) => {
        console.error("DELETE Error:", error);
      },
    }
  );
};
