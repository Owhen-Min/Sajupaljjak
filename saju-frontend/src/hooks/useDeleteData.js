import { useMutation, useQueryClient } from '@tanstack/react-query';
import { del } from '../api/apiService';

const useDeleteData = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uri }) => {
      const response = await del(uri);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });
};

export default useDeleteData;
