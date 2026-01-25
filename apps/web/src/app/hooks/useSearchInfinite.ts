import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getSearchResults, type TSearchResponse } from "../utils/quries";
import request from "graphql-request";

function useSearchInfinite(searchString: string) {
  const endpoint = "https://graphql.anilist.co";

  return useInfiniteQuery<
    TSearchResponse,
    Error,
    InfiniteData<TSearchResponse>,
    (string | number)[],
    number
  >({
    queryKey: ["search", searchString],
    enabled: searchString.length > 2,

    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      return await request(endpoint, getSearchResults, {
        search: searchString,
        page: pageParam,
      });
    },

    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.Page.pageInfo;
      return pageInfo.hasNextPage ? pageInfo.currentPage + 1 : undefined;
    },
  });
}
export default useSearchInfinite;
