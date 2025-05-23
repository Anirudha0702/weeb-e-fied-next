"use client";
import { TCoverImage, TMediaTitle } from "@/app/types";
import { getImageUrl, getTitle } from "@/app/utils/Functions";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Info, Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarouselItemProps {
  media: {
    id: number;
    coverImage: TCoverImage;
    bannerImage: string;
    description: string;
    title: TMediaTitle;
    episodes: number;
    format: string;
    genres: string[];
  };
}
export default function CarouselItem({ media }: CarouselItemProps) {
  const {
    id,
    coverImage,
    bannerImage,
    description,
    title,
    episodes,
    format,
    genres,
  } = media;
  const router = useRouter();
  const handleClick = (event: "watch" | "info") => {
    if (event === "watch") {
      router.push(`/anime/${id}/watch`);
    } else {
      router.push(`/anime/${id}`);
    }
  };
  return (
    <div className="relative">
      <div className="w-full max-h-[60svh] relative">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={getImageUrl({ ...coverImage, bannerImage })}
            alt="Carousel Item"
            fill
            className="absolute object-cover"
          />
        </AspectRatio>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t  from-[hsl(222.2,_84%,_4.9%)] to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b  from-[hsl(222.2,_84%,_4.9%)] to-transparent"></div>
      <Card className="absolute top-0 left-0 w-[80svw] max-w-[50rem] h-full flex flex-col justify-center  bg-transparent p-4 border-none">
        <CardContent>
          <div className="flex flex-col gap-1 md:gap-2">
            <h2 className="text-xl sm:text-3xl font-bold text-white line-clamp-2">
              {getTitle(title)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {format} | {episodes} episodes
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              {genres.map((genre, index) => (
                <span key={index} className="mr-1">
                  {genre}
                </span>
              ))}
            </p>
            <p
              className="line-clamp-2 md:line-clamp-4 text-xs xs:text-sm"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={() => handleClick("watch")}>
            <Play />
            Watch Now
          </Button>
          <Button onClick={() => handleClick("info")}>
            <Info />
            More Info
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
