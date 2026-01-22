import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { TStream } from "../types/api";

interface UseEpisodeArgs {
  id: number;
  title: string;
  episodeNo: number;
}

const fetchEpisode = async ({
  id,
  title,
  episodeNo,
}: UseEpisodeArgs): Promise<TStream> => {
  const { data } = await axios.post<TStream>(
    `${import.meta.env.VITE_APP_BACKEND}/media/episode`,
    {
      anilistId: id,
      episodeNo: episodeNo,
      animeName: title,
    },
  );

  return data;
};
export const useStreamLinks = ({ id, title, episodeNo }: UseEpisodeArgs) => {
  return useQuery({
    queryKey: ["episode", id, episodeNo],
    queryFn: () => fetchEpisode({ id, title, episodeNo }),
    enabled: Boolean(id && episodeNo && title),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
