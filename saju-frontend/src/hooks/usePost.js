import { useMutation, useQueryClient } from "react-query";
import apiClient from "../api/apiClient";

const usePost = (url) => {
  // const usePost = (url, onSuccess) => {
  // const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      const response = await apiClient.post(url, data);
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

export default usePost;
