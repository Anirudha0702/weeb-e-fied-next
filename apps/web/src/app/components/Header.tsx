import * as React from "react";
import { getPopularAnimes, TResponsePopularAnimes } from "@/app/utils/quries";
import client from "@/app/libs/apolloClient";
import { getCurrentSeason } from "@/app/utils/Functions";
import Carousel from "@/app/components/Carousel";
export default async function Header() {
  const { loading, data, error } = await client.query<TResponsePopularAnimes>({
    query: getPopularAnimes,
    variables: {
      type: "ANIME",
      sort: ["TRENDING_DESC"],
      season: getCurrentSeason(),
      page: 1,
      perPage: 10,
    },
  });

  return (
    <header className="relative w-full">
      <Carousel medias={data.Page.media}></Carousel>
    </header>
  );
}
