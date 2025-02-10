import { useQuery } from "react-query";
import apiClient from "../api/apiClient";

const useGet = (url, key) => {
  return useQuery(key, async () => {
    const { data } = await apiClient.get(url);
    return data;
  });
};

export default useGet;
