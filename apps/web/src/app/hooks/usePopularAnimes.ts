import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { getPopularAnimes, type TResponsePopularAnimes } from "../utils/quries";
import { getCurrentSeason } from "../utils/Functions";

function usePopularAnimes() {
  const endpoint = "https://graphql.anilist.co";
  const { isLoading, data, error } = useQuery<TResponsePopularAnimes>({
    queryKey: ["popular-animes"],
    queryFn: async () => {
      return await request(endpoint, getPopularAnimes, {
        type: "ANIME",
        sort: ["TRENDING_DESC"],
        season: getCurrentSeason(),
        page: 1,
        perPage: 10,
      });
    },
  });
  return { isLoading, data, error };
}
export default usePopularAnimes;
