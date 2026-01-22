import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { getSearchResults, type TSearchResponse } from "../utils/quries";

function useSearch(searchString: string, page = 1) {
  const endpoint = "https://graphql.anilist.co";
  const { isLoading, data, error } = useQuery<TSearchResponse>({
    queryKey: ["search", searchString, page],
    queryFn: async () => {
      return await request(endpoint, getSearchResults, {
        search: searchString,
        page,
      });
    },
    enabled: searchString.length > 2,
  });
  return { isLoading, data, error };
}
export default useSearch;
