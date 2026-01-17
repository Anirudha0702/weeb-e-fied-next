import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { getAnimeDetails, type TAnimeDetailsResponse } from "../utils/quries";
function useAnimeInfo(id: string) {
  const endpoint = "https://graphql.anilist.co";
  const { isLoading, data, error } = useQuery<TAnimeDetailsResponse>({
    queryKey: ["anime-info", id],
    queryFn: async () => {
      return await request(endpoint, getAnimeDetails, {
        mediaId: id,
      });
    },
    enabled: !!id,
  });
  return { isLoading, data, error };
}
export default useAnimeInfo;
