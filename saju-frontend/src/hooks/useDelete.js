import { useMutation, useQueryClient } from "react-query";
import apiClient from "../api/apiClient";

const useDelete = (url) => {
  // const useDelete = (url, onSuccess) => {
  // const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const response = await apiClient.delete(`${url}/${id}`);
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

export default useDelete;
