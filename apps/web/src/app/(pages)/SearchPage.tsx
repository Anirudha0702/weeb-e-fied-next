import { Route } from "@/routes/_layout/search";
import Breadcrumb from "../components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getTitle } from "../utils/Functions";
import {
  CirclePlus,
  Clock3,
  ClosedCaption,
  Hd,
  Play,
  Star,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchInfinite from "../hooks/useSearchInfinite";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { Input } from "@/components/ui/input";
import SearchFilter from "../components/search/SearchFilter";

function SearchPage() {
  const {
    query,
    year,
    season,
    format,
    airing_status,
    country_of_origin,
    source_material,
    genres,
  } = Route.useSearch();
  const _navigate = Route.useNavigate();
  const filter = useMemo(() => {
    return {
      year: year ?? null,
      season: season ?? null,
      format: format ?? null,
      airing_status: airing_status ?? null,
      country_of_origin: country_of_origin ?? null,
      source_material: source_material ?? null,

      // depends on your GraphQL query variable name:
      genres: genres?.length ? genres : null,
    };
  }, [
    year,
    season,
    format,
    airing_status,
    country_of_origin,
    source_material,
    genres,
  ]);
  const [searchString, setSearchString] = useState(query);
  const debouncedSearch = useDebounce(searchString, 1 * 1000);

  const navigate = useNavigate();

  const { isFetching, data, error, fetchNextPage, hasNextPage } =
    useSearchInfinite(debouncedSearch, filter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _navigate({
      search: (prev) => ({
        ...prev,
        query: e.target.value,
      }),
      replace: true,
    });
    setSearchString(e.target.value);
  };
  const handleFilter = (filters: {
    year: string | undefined;
    season: string | undefined;
    format: string | undefined;
    airing_status: string | undefined;
    country_of_origin: string | undefined;
    source_material: string | undefined;
    genres: string[];
  }) => {
    _navigate({
      search: (prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(filters).map(([k, v]) => {
            if (Array.isArray(v)) return [k, v.length ? v : undefined];
            if (v === undefined || v === "any") return [k, undefined];
            return [k, v];
          }),
        ),
      }),
      replace: true,
    });
  };
  useEffect(() => {
    setSearchString(query);
  }, [query]);

  const animes = data?.pages.flatMap((page) => page.Page.media) ?? [];
  return (
    <div className="pt-20 min-h-[calc(100svh-2rem)]">
      <Breadcrumb
        items={[{ label: "Home", href: "/home" }, { label: "Search" }]}
      />
      <div className="mt-3 p-4 bg-muted rounded-xl h-fit">
        <Input
          type="text"
          placeholder="Enter at least three letters to search"
          value={searchString}
          onChange={handleChange}
          className="w-full md:max-w-sm"
        />
        <SearchFilter onFilter={handleFilter} />
      </div>
      <div className="">
        <div className="text-xl my-2">
          <span>Search results for: </span>
          <span className="max-w-40 italic">{debouncedSearch}</span>
        </div>
        <section className="px-6 py-8">
          {isFetching && (
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
          )}

          {error && (
            <div className=" text-center">
              <img
                src="/images/error-loli-xs.gif"
                className=" h-32 aspect-square mx-auto"
              />
              <h2 className="text-xl font-semibold text-primary">
                Failed to load anime
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Something went wrong while fetching anime details. Please try
                again later.
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  Retry
                </Button>

                <Button
                  onClick={() =>
                    navigate({
                      to: "/home",
                    })
                  }
                  className="px-4 py-2 rounded-md border text-sm hover:bg-gray-50 transition"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}
          {animes.length > 0 ? (
            <InfiniteScroll
              dataLength={animes.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<p>loading</p>}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {animes?.map((anime) => (
                  <HoverCard key={anime.id}>
                    <HoverCardTrigger>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate({
                            to: `/info/${anime.id}`,
                          })
                        }
                      >
                        <div className="relative overflow-hidden rounded-xl aspect-2/3 ">
                          <img
                            src={anime.coverImage?.extraLarge}
                            alt={anime.title.userPreferred}
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                            <h3 className="text-sm font-medium line-clamp-2">
                              {getTitle(anime.title)}
                            </h3>
                            <span className="text-xs opacity-70 mt-1">
                              {anime.format}
                            </span>
                          </div>
                        </div>

                        <p className="mt-2 text-sm line-clamp-2">
                          {getTitle(anime.title)}
                        </p>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent
                      align="start"
                      alignOffset={20}
                      sideOffset={-50}
                      side="right"
                      className="w-72"
                    >
                      <p className="text-lg line-clamp-2 font-bold">
                        {getTitle(anime.title)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs flex items-center justify-center">
                          <Star color="yellow " className="mr-2" size={12} />
                          {anime.averageScore != null
                            ? (anime.averageScore / 10).toFixed(1)
                            : "N/A"}
                        </span>
                        <div className="md:self-start flex items-center justify-between text-[#999] text-sm gap-2 ">
                          {anime.episodes && (
                            <span className="flex gap-2  items-center">
                              <ClosedCaption size={16} /> {anime.episodes}
                            </span>
                          )}
                          {anime.duration && (
                            <span className="flex gap-2  items-center">
                              <Clock3 size={16} /> {anime.duration} mins
                            </span>
                          )}
                          <Hd />
                        </div>
                      </div>
                      <p
                        className="text-sm text-muted-foreground line-clamp-5 **:inline [&_br]:hidden"
                        dangerouslySetInnerHTML={{ __html: anime.description }}
                      />
                      <div className=" mb-4">
                        {anime.genres && (
                          <div>
                            <div>
                              <span className="font-semibold text-xs">
                                Genres
                              </span>{" "}
                              :
                            </div>
                            <div className="text-xs pt-2 flex flex-wrap gap-2">
                              {anime.genres.map((genre) => (
                                <span className=" border p-1 hover:border-primary hover:text-primary cursor-pointer">
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex  justify-center items-center gap-2">
                        <Button
                          className={`cursor-pointer p-3 rounded-full grow`}
                          disabled={["NOT_YET_RELEASED", "CANCELLED"].includes(
                            anime.status,
                          )}
                          onClick={() =>
                            navigate({
                              to: `/watch/${anime.id}?${getTitle(anime.title)}`,
                            })
                          }
                        >
                          {" "}
                          Watch Now
                          <Play className="mr-2" />
                        </Button>
                        <Button size="icon" className="rounded-full">
                          <CirclePlus />
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
           <div className="max-w-md text-center mx-auto">
          <img
            src="/images/error-loli-xs.gif"
            className=" h-32 aspect-square mx-auto"
          />
          <h2 className="text-xl font-semibold text-primary">
            No results found
          </h2>
          </div>
          )}
        </section>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SearchPage;
