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
  ChevronDown,
  ChevronUp,
  CirclePlus,
  Clock3,
  ClosedCaption,
  Funnel,
  Hd,
  ListFilterPlus,
  Play,
  Star,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchInfinite from "../hooks/useSearchInfinite";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { genres, searchOptions } from "../utils/constants";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function SearchPage() {
  const { query } = Route.useSearch();
  const [searchString, setSearchString] = useState(query);
  const debouncedSearch = useDebounce(searchString, 1 * 1000);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedenres, setSelectedGenres] = useState<string[]>([]);

  const { isFetching, data, error, fetchNextPage, hasNextPage } =
    useSearchInfinite(debouncedSearch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };
  const getOption = (option: (typeof searchOptions)[number]) => {
    if (!searchOptions.includes(option)) return [];
    const options = [
      {
        key: "any",
        value: "Any",
      },
    ];
    if (option === "Year") {
      const startYear = 1970;
      const endYear = new Date().getFullYear();

      for (let year = endYear; year >= startYear; year--) {
        options.push({
          key: String(year),
          value: String(year),
        });
      }
    } else if (option === "Season")
      options.push(
        { key: "WINTER", value: "Winter" },
        { key: "SPRING", value: "Spring" },
        { key: "SUMMER", value: "Summer" },
        { key: "FALL", value: "Fall" },
      );
    else if (option === "Format") {
      options.push(
        { key: "TV", value: "TV Show" },
        { key: "MOVIE", value: "Movie" },
        { key: "TV_SHORT", value: "TV Short" },
        { key: "SPECIAL", value: "Special" },
        { key: "OVA", value: "OVA" },
        { key: "ONA", value: "ONA" },
        { key: "MUSIC", value: "Music" },
      );
    } else if (option === "Country Of Origin") {
      options.push(
        { key: "JP", value: "Japan" },
        { key: "KR", value: "South Korea" },
        { key: "CN", value: "China" },
        { key: "TW", value: "Taiwan" },
      );
    } else if (option === "Airing Status") {
      options.push(
        { key: "RELEASING", value: "Airing" },
        { key: "FINISHED", value: "Finished" },
        { key: "NOT_YET_RELEASED", value: "Not Yet Aired" },
        { key: "CANCELLED", value: "Cancelled" },
      );
    } else if (option === "Source Material") {
      options.push(
        { key: "ORIGINAL", value: "Original" },
        { key: "MANGA", value: "Manga" },
        { key: "LIGHT_NOVEL", value: "Light Novel" },
        { key: "WEB_NOVEL", value: "Web Novel" },
        { key: "NOVEL", value: "Novel" },
        { key: "ANIME", value: "Anime" },
        { key: "VISUAL_NOVEL", value: "Visual Novel" },
        { key: "VIDEO_GAME", value: "Video Game" },
        { key: "DOUJINSHI", value: "Doujinshi" },
        { key: "COMIC", value: "Comic" },
        { key: "LIVE_ACTION", value: "Live Action" },
        { key: "GAME", value: "Game" },
        { key: "MULTIMEDIA_PROJECT", value: "Multimedia Project" },
        { key: "PICTURE_BOOK", value: "Picture Book" },
        { key: "OTHER", value: "Other" },
      );
    }

    return options;
  };
  useEffect(() => {
    setSearchString(query);
  }, [query]);
  const animes = data?.pages.flatMap((page) => page.Page.media) ?? [];
  const visibleGenres = expanded ? genres : genres.slice(0, 12);
  return (
    <div className="pt-20">
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
        <div className="">
          <div className="">
            <h2
              className="my-4 text-xl font-semibold flex items-center gap-2 cursor-pointer md:cursor-default"
              onClick={() => setShowAdvanced((prev) => !prev)}
            >
              Advanced Options <ListFilterPlus size={20} />
              {/* Optional helper text for mobile */}
              <span className="text-sm text-muted-foreground md:hidden">
                (tap to {showAdvanced ? "hide" : "show"})
              </span>
            </h2>
          </div>
          <div
            className={`flex flex-wrap gap-2 ${showAdvanced ? "flex" : "hidden"} md:flex `}
          >
            {searchOptions.map((option) => {
              const fields = getOption(option);
              return (
                <Field className="w-full max-w-48">
                  <FieldLabel>{option}</FieldLabel>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${option}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {fields?.map((field) => (
                          <SelectItem value={field.key}>
                            {field.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              );
            })}
          </div>
          <span
            className={`${showAdvanced ? "flex" : "hidden"} md:flex  text-md font-semibold mt-3 block`}
          >
            Genres
          </span>
          <div
            className={`${showAdvanced ? "flex" : "hidden"} md:flex  flex gap-2 flex-wrap items-center text-sm my-2`}
          >
            {visibleGenres.map((genre) => (
              <span
                title={genre}
                onClick={() =>
                  setSelectedGenres((selected) =>
                    selected.includes(genre)
                      ? selected.filter((g) => g !== genre)
                      : [...selected, genre],
                  )
                }
                key={genre}
                className={`flex items-center gap-2 p-2 px-4 border border-white/20 rounded-md cursor-pointer hover:text-primary text-xs ${selectedenres.includes(genre) ? "bg-primary text-whitem hover:text-white" : ""}`}
              >
                {genre}
              </span>
            ))}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 p-2 px-4 bg-black/30 rounded-md cursor-pointer hover:bg-muted text-xs"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" /> Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" /> More
                </>
              )}
            </button>
          </div>
          <Button
            className={`mt-4  ${showAdvanced ? "flex" : "hidden"} md:flex cursor-pointer`}
          >
            Filter <Funnel />
          </Button>
        </div>
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
          <InfiniteScroll
            dataLength={animes.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<p>loading</p>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
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
        </section>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SearchPage;
