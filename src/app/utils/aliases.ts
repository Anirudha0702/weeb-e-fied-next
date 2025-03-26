import { TStatus } from "../types";

export const status:Record<string,TStatus>={
    RELEASING:"RELEASING",
    NOT_YET_RELEASED:"NOT_YET_RELEASED",
    CANCELLED:"CANCELLED",
    FINISHED:"FINISHED",
    HIATUS:"HIATUS"
}
export const Links = [
    { name: "Home", url: "home" },
    { name: "Subbed Anime", url: "subbed-anime" },
    { name: "Dubbed Anime", url: "dubbed-anime" },
    { name: "Most Popular", url: "most-popular" },
    { name: "Movies", url: "movies" },
    { name: "TV Series", url: "tv-series" },
    { name: "OVAs", url: "ovas" },
    { name: "ONAs", url: "onas" },
    { name: "Specials", url: "specials" },
    { name: "Events", url: "events" }
  ];
  