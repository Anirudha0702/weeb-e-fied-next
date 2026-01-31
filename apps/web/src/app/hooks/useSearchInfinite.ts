import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getSearchResults, type TSearchResponse } from "../utils/quries";
import request from "graphql-request";

function useSearchInfinite(
  searchString: string,
  filter: {
    year: string | null;
    season: string | null;
    format: string | null;
    airing_status: string | null;
    country_of_origin: string | null;
    source_material: string | null;
    genres: string[] | null;
  },
) {
  const endpoint = "https://graphql.anilist.co";
  const variablesFilter = {
    seasonYear: filter.year ? Number(filter.year) : null,
    season: filter.season,
    format: filter.format,
    status: filter.airing_status,
    countryOfOrigin: filter.country_of_origin,
    source: filter.source_material,
    genre_in: filter.genres,
  };

  const cleanedVariables = Object.fromEntries(
    Object.entries(variablesFilter).filter(([_, v]) => v != null),
  );
  return useInfiniteQuery<
    TSearchResponse,
    Error,
    InfiniteData<TSearchResponse>,
    (string | number)[],
    number
  >({
    queryKey: ["search", searchString, JSON.stringify(cleanedVariables)],
    enabled: searchString.length > 2,

    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      return await request(endpoint, getSearchResults, {
        search: searchString,
        page: pageParam,
        ...cleanedVariables,
      });
    },

    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.Page.pageInfo;
      return pageInfo.hasNextPage ? pageInfo.currentPage + 1 : undefined;
    },
  });
}
export default useSearchInfinite;
