import { useMutation, useQueryClient } from "react-query";
import apiClient from "../api/apiClient";

const usePut = (url) => {
  // const usePut = (url, onSuccess) => {
  // const queryClient = useQueryClient();

  return useMutation(
    async ({ id, data }) => {
      const response = await apiClient.put(`${url}/${id}`, data);
      return response.data;
    },
    // {
    //   onSuccess: () => {
    //     if (onSuccess) onSuccess();
    //     queryClient.invalidateQueries();
    //   },
    // }
  );
};

export default usePut;
