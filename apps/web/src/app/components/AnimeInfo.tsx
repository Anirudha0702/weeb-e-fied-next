import WatchListButton from "@/app/components/WatchListButton";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

interface AnimeInfoProps {
  id: number;
  description: string;
  title: string;
  coverImage: string;
  trailer: { site: string; id: string; thumbnail: string } | null;
  isAdult?: boolean;
}
export default function AnimeInfo({
  id,
  description,
  title,
  coverImage,
  trailer,
  isAdult = false,
}: AnimeInfoProps) {
  return (
    <div className="p-4  relative">
      <div className=" max-w-screen-xl mx-auto flex gap-4 flex-col sm:flex-row items-start ">
        <div className="w-[100px] sm:w-[200px] flex sm:inline-flex gap-2 sm:flex-col">
          <div className="w-[100px] sm:w-[200px] aspect-[3/4] relative -mt-32 sm:-mt-34 shrink-0">
            {isAdult && (
              <div className="z-[100] absolute top-0 left-0 w-full h-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                18+
              </div>
            )}
            <Image
              src={coverImage}
              alt="Anime Cover"
              fill
              className="object-cover rounded"
              sizes="(min-width: 640px) 200px, 100px"
            />
          </div>
          <div className="flex items-center py-2 gap-2">
            <WatchListButton
              id={id}
              className="grow max-w-40"
              isInWatchList
              value="watching"
            />
            <Button className="bg-secondary">
              <Play />
            </Button>
          </div>
        </div>
        <div className="max-w-2xl">
          <div className="">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p
              className="text-sm text-muted-foreground block max-w-[1/3]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
        {trailer && (
          <div className="hidden lg:block  w-full min-w-60">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.id}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
