import { useMutation, useQueryClient } from '@tanstack/react-query';
import { put } from '../api/apiService';

const usePutData = (queryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uri, data }) => {
      const response = await put(uri, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });
};

export default usePutData;
