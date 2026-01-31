import { genres } from "@/app/utils/constants";
import { useNavigate } from "@tanstack/react-router";
import { Folders, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

function Genres() {
  

  const [expanded, setExpanded] = useState(false);
  const [isXL, setIsXL] = useState(false);
  const navigate = useNavigate();
const navigateToGenre=(e:React.MouseEvent<HTMLSpanElement>)=>{
  const genre=(e.target as HTMLSpanElement).title;
  navigate({
    to:"/genre",
    search:{genre}
  })
}
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const handler = () => setIsXL(media.matches);
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const visibleGenres = isXL || expanded ? genres : genres.slice(0, 12);

  return (
    <div className="my-3 flex gap-2 flex-wrap items-center text-sm px-6">
      {/* Header */}
      <span className="flex items-center gap-2 p-2 px-4 bg-muted/50 rounded-md">
        <Folders className="h-4 w-4" />
        <span>Genres</span>
      </span>

      {/* Genres */}
      {visibleGenres.map((genre) => (
        <span
        title={genre}
        onClick={navigateToGenre}
          key={genre}
          className="flex items-center gap-2 p-2 px-4 bg-muted/50 rounded-md cursor-pointer hover:bg-muted"
        >
          {genre}
        </span>
      ))}

      {/* More / Less button (hidden on xl+) */}
      {!isXL && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 p-2 px-4 bg-black/30 rounded-md cursor-pointer hover:bg-muted"
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
      )}
    </div>
  );
}

export default Genres;
