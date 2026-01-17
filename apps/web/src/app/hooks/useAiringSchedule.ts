import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import {
  getAiringSchedule,
  type TResponseAiringSchedule,
} from "../utils/quries";
import { getStartEndOfWeek } from "../utils/Functions";

function useAiringSchedule() {
  const endpoint = "https://graphql.anilist.co";
  const { start, end } = getStartEndOfWeek();
  const { isLoading, data, error } = useQuery<TResponseAiringSchedule>({
    queryKey: ["schedule"],
    queryFn: async () => {
      return await request(endpoint, getAiringSchedule, {
        start,
        end,
      });
    },
  });
  return { isLoading, data, error };
}
export default useAiringSchedule;
