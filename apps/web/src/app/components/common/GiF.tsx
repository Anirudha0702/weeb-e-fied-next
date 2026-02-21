import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import type {  IGif } from '@giphy/js-types'
import type { SyntheticEvent } from "react";
interface GiFProps {
  onSelect: (gifUrl: string) => void;
}

function GiF({ onSelect }: GiFProps) {
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });
  const handleGifClick = (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
    // gif.images.original.url is the full GIF URL
    e.preventDefault();
    onSelect(gif.images.original.url);
  };
  return <div
      className="w-[320px] h-85.5 overflow-y-auto overflow-x-hidden" // fixed height + scroll
    >
      <Grid
        width={320}           // width of the grid
        columns={3}           // number of columns
        fetchGifs={fetchGifs}
        gutter={6}  
        onGifClick={handleGifClick}
      />
    </div>;
}

export default GiF;
