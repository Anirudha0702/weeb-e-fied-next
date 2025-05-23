import client from "@/app/libs/apolloClient";
import { getCurrentSeason } from "@/app/utils/Functions";
import { getPopularAnimes, TResponsePopularAnimes } from "@/app/utils/quries";
import { ApolloError, useQuery } from "@apollo/client";

export const usePopularAnimes = () => {
  const { loading, data, error } = useQuery<TResponsePopularAnimes>(
    getPopularAnimes,
    {
      variables: {
        type: "ANIME",
        sort: ["TRENDING_DESC"],
        season: getCurrentSeason(),
        page: 1,
        perPage: 10,
      },
    }
  );
  return { loading, data, error };
};
