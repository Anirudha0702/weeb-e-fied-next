import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { getLatestAnimes, type TResponsePopularAnimes } from "../utils/quries";
import { getCurrentSeason } from "../utils/Functions";

function useLatestAnimes() {
  const endpoint = "https://graphql.anilist.co";
  const { isLoading, data, error } = useQuery<TResponsePopularAnimes>({
    queryKey: ["popular-animes"],
    queryFn: async () => {
      return await request(endpoint, getLatestAnimes, {
        type: "ANIME",
        season: getCurrentSeason(),
        year: new Date().getFullYear(),
      });
    },
  });
  return { isLoading, data, error };
}
export default useLatestAnimes;
