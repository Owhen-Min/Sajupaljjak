import { useQuery } from '@tanstack/react-query';
import { get } from '../api/apiService';

const useFetchData = (uri, queryKey) => {
  const fetchData = async () => {
    const { data } = await get(uri);
    return data;
  };

  return useQuery(queryKey, fetchData);
};

export default useFetchData;
