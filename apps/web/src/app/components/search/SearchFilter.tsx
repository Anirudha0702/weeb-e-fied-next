import { genres as _genres, searchOptions } from "@/app/utils/constants";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Route } from "@/routes/_layout/search";
import { ChevronDown, ChevronUp, Funnel, ListFilterPlus } from "lucide-react";
import { useState } from "react";

interface ISearchFilter {
  onFilter: (filters: {
    year: string | undefined;
    season: string | undefined;
    format: string | undefined;
    airing_status: string | undefined;
    country_of_origin: string | undefined;
    source_material: string | undefined;
    genres: string[];
  }) => void;
}
const mapOptionToKey = {
  Year: "year",
  Season: "season",
  Format: "format",
  "Airing Status": "airing_status",
  "Country Of Origin": "country_of_origin",
  "Source Material": "source_material",
} as const;
function SearchFilter({ onFilter }: ISearchFilter) {
  const {
    year,
    season,
    format,
    airing_status,
    country_of_origin,
    source_material,
    genres = [],
  } = Route.useSearch();
  const [filterOptions, setFilterOptions] = useState({
    year,
    season,
    format,
    airing_status,
    country_of_origin,
    source_material,
    genres,
  });

  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
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
  const handleFilterClick = () => {
    onFilter(filterOptions);
  };
  const updateGenres = (e: React.MouseEvent<HTMLSpanElement>) => {
    const genre = e.currentTarget.title;
    if (!genre) return;
    const newGenres = filterOptions.genres.includes(genre)
      ? filterOptions.genres.filter((g) => g !== genre)
      : [...filterOptions.genres, genre];
    setFilterOptions((prev) => ({ ...prev, genres: newGenres }));
  };

  const visibleGenres = expanded ? _genres : _genres.slice(0, 12);
  const selectedenres = filterOptions.genres;
  return (
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
              <Select
                defaultValue="any"
                value={filterOptions[mapOptionToKey[option]]}
                onValueChange={(value) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    [mapOptionToKey[option]]:
                      value === "any" ? undefined : value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${option}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fields?.map((field) => (
                      <SelectItem value={field.key}>{field.value}</SelectItem>
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
            onClick={updateGenres}
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
        onClick={handleFilterClick}
      >
        Filter <Funnel />
      </Button>
    </div>
  );
}

export default SearchFilter;
