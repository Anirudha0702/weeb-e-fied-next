import SearchPage from "@/app/(pages)/SearchPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/search/")({
  validateSearch: (search) => ({
    query: typeof search.query === "string" ? search.query : "",

    year: typeof search.year === "string" ? search.year : undefined,
    season: typeof search.season === "string" ? search.season : undefined,
    format: typeof search.format === "string" ? search.format : undefined,
    airing_status:
      typeof search.airing_status === "string" ? search.airing_status : undefined,
    country_of_origin:
      typeof search.country_of_origin === "string"
        ? search.country_of_origin
        : undefined,
    source_material:
      typeof search.source_material === "string"
        ? search.source_material
        : undefined,

    genres: (typeof search.genres === "string"
      ? [search.genres]
      : Array.isArray(search.genres)
        ? search.genres
        : undefined) as string[]|undefined,
  }),
  component: SearchPage,
});
