import useDebounce from "@/app/hooks/useDebounce";
import useSearch from "@/app/hooks/useSearch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Frown, Loader, SearchAlert } from "lucide-react";
import { getImageUrl, getTitle } from "@/app/utils/Functions";

function Search() {
  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce(searchString, 2 * 1000);
  const navigate = useNavigate();
  const { isLoading, data, error } = useSearch(debouncedSearch, 1);
  const [open, setOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    setOpen(true);
  };

  return (
    <div className="max-w-md mx-2 w-full relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="Enter at least three letters to search"
            value={searchString}
            onChange={handleChange}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setOpen(false);
              navigate({
                to: "/search",
                search: (prev) => {
                  const {
                    format,
                    year,
                    season,
                    airing_status,
                    country_of_origin,
                    source_material,
                    genres,
                  } = prev;

                  return {
                    query: searchString, // required
                    format: format ?? undefined,
                    year: year ?? undefined,
                    season: season ?? undefined,
                    airing_status: airing_status ?? undefined,
                    country_of_origin: country_of_origin ?? undefined,
                    source_material: source_material ?? undefined,
                    genres: genres ?? undefined,
                  };
                },
              });
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-2 min-h-32"
        >
          {debouncedSearch.length < 2 && (
            <div className="text-sm text-muted-foreground px-2 py-1 h-32 flex  justify-center items-center">
              Type something to search
            </div>
          )}
          {isLoading && (
            <div className="text-sm text-muted-foreground px-2 py-1 h-32 flex  justify-center items-center">
              <Loader className="animate-spin mr-2" />
              Searching...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-sm text-destructive px-2 py-1 h-32 flex  justify-center items-center">
              <div className="">
                <SearchAlert className="mx-auto" size={26} /> Something went
                wrong
              </div>
            </div>
          )}

          {data?.Page?.media?.slice(0, 5).map((anime) => (
            <div
              key={anime.id}
              className="p-2 rounded-md cursor-pointer hover:bg-accent grid grid-cols-[4rem_1fr] gap-2"
              onPointerDown={() => {
                setOpen(false);
                navigate({ to: `/info/${anime.id}` });
              }}
            >
              <div className="relative  h-full w-16 shrink-0 grow-0">
                <img
                  src={getImageUrl(anime.coverImage)}
                  alt={getTitle(anime.title)}
                  className="object-cover  absolute h-full w-full"
                />
              </div>
              <div className="">
                <h3 className="font-semibold">{getTitle(anime.title)}</h3>
                <p
                  className="text-sm text-muted-foreground line-clamp-2 **:inline [&_br]:hidden"
                  dangerouslySetInnerHTML={{ __html: anime.description }}
                />
                <div className="flex gap-2 text-[10px] text-muted-foreground">
                  <span>{anime.startDate.year}</span>•
                  <span>{anime.format}</span>•<span>{anime.duration}m</span>
                </div>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {!isLoading &&
            debouncedSearch.length > 2 &&
            data?.Page?.media?.length === 0 && (
              <div className="text-sm text-muted-foreground px-2 py-1 h-32 flex  justify-center items-center">
                <Frown className="mr-2" /> No results found.
              </div>
            )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Search;
