import AnimeInfo from "@/app/components/AnimeInfo";
import client from "@/app/libs/apolloClient";
import { getImageUrl, getTitle } from "@/app/utils/Functions";
import { getAnimeDetails, TAnimeDetailsResponse } from "@/app/utils/quries";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnimeInfoPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function AnimeInfoPage({ params }: AnimeInfoPageProps) {
  const { id } = await params;
  const {
    data: { Media },
    loading,
    error,
  } = await client.query<TAnimeDetailsResponse>({
    query: getAnimeDetails,
    variables: {
      mediaId: id,
    },
  });
  return (
    <div className="">
      <div
        className={"w-full bg-cover bg-center h-[210px] md:h-[400px] relative"}
        style={{
          backgroundImage: `url(${getImageUrl({
            ...Media.coverImage,
            bannerImage: Media.bannerImage,
          })})`,
        }}
      ></div>
      <AnimeInfo
        id={Media.id}
        description={Media.description}
        title={getTitle(Media.title)}
        coverImage={getImageUrl(Media.coverImage)}
      />
    </div>
  );
}
