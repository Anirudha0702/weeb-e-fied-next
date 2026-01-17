import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Play } from "lucide-react";
import useLatestAnimes from "@/app/hooks/useLatestAnimes";
import { useNavigate } from "@tanstack/react-router";
import { getTitle } from "@/app/utils/Functions";

function Banner() {
  const { isLoading, error, data } = useLatestAnimes();
  const [active, setActive] = useState(0);
  const navigate=useNavigate()
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % (data?.Page.media.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);
  if (isLoading) {
    return <div className="h-80 lg:h-[70svh] relative overflow-hidden bg-background">
      {/* Background shimmer */}
      <div className="absolute inset-0 animate-pulse bg-linear-to-r from-muted via-muted/60 to-muted" />

      {/* Content */}
      <div className="absolute bottom-0 pl-10 flex gap-4 items-start p-4 w-full z-10">
        {/* Cover image skeleton */}
        <div className="hidden lg:block w-45 h-65 rounded-md bg-muted animate-pulse" />

        {/* Text skeletons */}
        <div className="flex flex-col gap-3 pt-6 w-full max-w-lg">
          {/* Title */}
          <div className="h-10 w-3/4 bg-muted rounded animate-pulse" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-muted rounded animate-pulse hidden lg:block" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Gradients (same as real banner) */}
      <div className="absolute bottom-8 w-full h-1/2 bg-gradient-to-t from-background to-transparent hidden lg:block" />
      <div className="absolute bottom-0 w-full h-12 bg-background hidden lg:block" />
    </div>
  }
  if (error || !data) {
    return <div className="h-80 grow bg-red-800">Error loading banner</div>;
  }
  const animes = data.Page.media || [];
  return (
    <div className="h-80 lg:h-[70svh]  overflow-hidden relative">
     
      <AnimatePresence mode="wait">
        {animes.map(
          (anime, index) =>
            active === index && (
              <motion.div
                key={anime.id}
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  className="absolute h-full w-full object-cover"
                  src={
                    anime.bannerImage ||
                    anime.coverImage.extraLarge ||
                    "https://imgs.search.brave.com/VcxLz7-BY3z6UOo6gPii2J8aRW_17o6HE5q7K77tQq0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzBkLzIz/L2ViLzBkMjNlYjk1/ZjJhOTZmMWY0ZDVh/YWU5YjRmZTc5MWZi/LmpwZw"
                  }
                  alt={anime.title?.english || ""}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="z-10 absolute bottom-0 pl-10 flex gap-4 items-start bg-linear-to-b from-transparent to-background p-4   w-full ">
        <AnimatePresence mode="wait">
          <motion.img
            key={`img-${active}`}
            src={animes[active].coverImage.large}
            alt=""
            className="border-2 border-white rounded-md hidden lg:block"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: 0.2,
            }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <div className="">
            <motion.h1
              key={`title-${active}`}
              className="text-5xl font-semibold leading-tight z-30 line-clamp-1 pt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: 0.47, // 👈 comes after image
              }}
            >
              {getTitle(animes[active]?.title) || ""}
            </motion.h1>
            <motion.h1
              key={`desc-${active}`}
              className="mt-2 text-sm max-w-lg line-clamp-2 lg:line-clamp-6 "
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: 0.47, // 👈 comes after image
              }}
            >
              {animes[active]?.description
                ? // Strip HTML tags from description
                  animes[active].description.replace(/<[^>]+>/g, "")
                : "No description available."}
            </motion.h1>
            <motion.div
              key={`button-${active}`}
              className="mt-4 flex gap-3 z-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: 0.47, // 👈 comes after image
              }}
            >
              <Button className="cursor-pointer">
                {" "}
                <Play />
                Watch Now
              </Button>
              <Button className="text-white bg-transparent border-2 border-primary cursor-pointer" onClick={()=>navigate({
              to:`/info/${animes[active].id}`
            })}>
                <Info /> More Info{" "}
              </Button>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 w-full h-1/2 bg-linear-to-t from-background to-transparent z-5 hidden lg:block "></div>
      <div className="absolute bottom-0 w-full h-12 bg-linear-to-t bg-background  z-50 hidden lg:block"></div>
    </div>
  );
}

export default Banner;
