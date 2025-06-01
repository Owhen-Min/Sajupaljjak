import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const fetchData = async ({ pageParam = 0, queryKey }) => {
  const [uri, type, query] = queryKey;

  const params = { cursor: pageParam };
  if (type) params.type = type;
  if (query) params.query = query;

  const { data } = await apiClient.get(uri, { params });
  console.log("data", data);
  console.log("cursor : ", pageParam);

  return data;
};

const useInfiniteGet = (uri, { type, query, initialCursor } = {}) => {
  return useInfiniteQuery({
    queryKey: [uri, type, query], 
    queryFn: ({ pageParam = initialCursor }) =>
      fetchData({
        pageParam,
        queryKey: [uri, type, query],
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });
};

export default useInfiniteGet;
