import request from "graphql-request";
import { getCurrentSeason } from "../utils/Functions";
import { useQuery } from "@tanstack/react-query";
import {
  getTrendingAnimes,
  type TResponseWithPageInfo,
} from "../utils/quries";

function useTrending() {
  const endpoint = "https://graphql.anilist.co";
  const { isLoading, data, error } = useQuery<TResponseWithPageInfo>({
    queryKey: ["trending-animes"],
    queryFn: async () => {
      return await request(endpoint, getTrendingAnimes, {
        type: "ANIME",
        sort: ["TRENDING_DESC"],
        season: getCurrentSeason(),
        year: new Date().getFullYear,
      });
    },
  });
  return { isLoading, data, error };
}
export default useTrending;
