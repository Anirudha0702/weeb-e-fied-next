import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { getAnimeDetails, type TAnimeDetailsResponse } from "../utils/quries";
// import type { TWatchlist } from "../types/api";
// import { fetchApi } from "./useApi";
function useAnimeInfo(id: string) {
  const endpoint = "https://graphql.anilist.co";
  const { isLoading, data, error } = useQuery<TAnimeDetailsResponse>({
    queryKey: ["anime-info", id],
    queryFn: async () => {
      // const [animeDetails, extraData] = await Promise.all([
      //   request(endpoint, getAnimeDetails, { mediaId: id }),
      //   fetchApi<TWatchlist>({
      //     endpoint: `/watchlist/inlist/${id}`,
      //     method: "GET",
      //     key: [ "watchlist-info", id],
      //   }),
      // ]);

      // return { ...animeDetails, watchlistInfo: extraData };
      return await request(endpoint, getAnimeDetails, {
        mediaId: id,
      });
    },
    enabled: !!id,
  });
  return { isLoading, data, error };
}
export default useAnimeInfo;
