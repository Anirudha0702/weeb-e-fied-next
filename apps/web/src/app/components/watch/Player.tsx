import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IPlayer {
  url?: string;
  className?: string;
}
function Player({ url, className = "" }: IPlayer) {
  const [iframeError, setIFrameError] = useState(false);
  if (iframeError) {
    return (
      <div className="h-[70svh] flex flex-col items-center justify-center gap-4 bg-black text-white">
        <img src="/images/error-loli-xs.gif" className="h-32 aspect-square" />
        <p className="text-sm opacity-80">Failed to load video player</p>

        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </Button>
      </div>
    );
  }
  return (
    <iframe
      key={url}
      className={`mt-20 w-full h-[30svh] sm:h-[50svh] md:h-[70svh] ${className}`}
      src={url}
      allow="fullscreen"
      allowFullScreen
      onError={() => {
        setIFrameError(true);
      }}
    ></iframe>
  );
}

export default Player;
