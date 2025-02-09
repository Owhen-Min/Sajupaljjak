import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post } from '../api/apiService';

const usePostData = (queryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uri, data }) => {
      const response = await post(uri, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });
};

export default usePostData;
