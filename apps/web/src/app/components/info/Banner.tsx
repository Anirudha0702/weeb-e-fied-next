import type { TCoverImage } from "@/app/types/types";
import { getImageUrl } from "@/app/utils/Functions";

interface IBanner {
  bannerImage: string;
  coverImage: TCoverImage;
  trailer: {
    site: string;
    id: string;
    thumbnail: string;
  } | null;
}
function Banner({ coverImage, bannerImage, trailer }: IBanner) {
  return (
    <div className="relative h-[30svh] md:h-[40svh]   mt-3">
      <div className="md:hidden absolute top-0 h-[80%] w-full bg-linear-to-b from-background to-transparent z-10"></div>
      <div className="relative w-full h-full md:hidden overflow-hidden">
        <img
          src={getImageUrl({ ...coverImage, bannerImage })}
          className="
      absolute inset-0
      h-full w-full
      object-cover
      scale-110
      blur-sm
    "
          alt=""
        />
      </div>
      <div className="md:hidden mx-auto absolute bottom-0 h-52 z-20  aspect-3/4 left-1/2 -translate-x-1/2">
        <img
          src={getImageUrl(coverImage)}
          alt=""
          className="absolute h-full w-full object-cover"
        />
      </div>

      <div className="hidden md:flex relative w-full h-full  gap-2">
        <div className="relative w-72">
          <img
            src={getImageUrl(coverImage)}
            alt=""
            className="absolute h-full w-full object-cover"
          />
        </div>
        <div className=" min-w-60 grow">
          {trailer && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
