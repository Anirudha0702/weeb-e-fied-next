import useTrending from "@/app/hooks/useTrending";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

function Trending() {
  const { error, isLoading, data } = useTrending();
const navigate=useNavigate()
  if (isLoading) {
    return (
      <section className="px-6 py-8">
      {/* Header skeleton */}
      <div className="h-7 w-40 mb-6 bg-muted rounded animate-pulse" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-2">
            {/* Poster */}
            <div className="aspect-2/3 rounded-xl bg-muted animate-pulse" />

            {/* Title */}
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  )
  }

  if (error || !data) {
    return (
      <div className="h-80 flex items-center justify-center text-red-500">
        Error loading trending anime
      </div>
    );
  }

  const animes = data.Page.media.slice(0, 12);

  return (
    <section className="px-6 py-8">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-6"
      >
        Trending 🔥
      </motion.h2>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {animes.map((anime) => (
          <motion.div
            key={anime.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={()=>navigate({
              to:`/info/${anime.id}`
            })}
          >
            {/* Poster */}
            <div className="relative overflow-hidden rounded-xl aspect-[2/3]">
              <img
                src={anime.coverImage?.extraLarge}
                alt={anime.title.userPreferred}
                className="w-full h-full object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <h3 className="text-sm font-medium line-clamp-2">
                  {anime.title.userPreferred}
                </h3>
                <span className="text-xs opacity-70 mt-1">{anime.format}</span>
              </div>
            </div>

            {/* Title */}
            <p className="mt-2 text-sm line-clamp-2">
              {anime.title.userPreferred}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Trending;
