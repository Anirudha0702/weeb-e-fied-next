import { useNavigate, useParams } from "@tanstack/react-router";
import useAnimeInfo from "../hooks/useAnimeInfo";
import { Button } from "@/components/ui/button";
import AnimeDetails from "../components/info/AnimeDetails";
import { useStreamLinks } from "../hooks/useStreamLinks";
import { getTitle } from "../utils/Functions";
import { useEffect, useState } from "react";

function WatchPage() {
  const params = useParams({
    from: "/_layout/watch/$id",
  });
  const id = params.id;
  const [selectedep, setSelectedEp] = useState(1);
  const { error, isLoading, data: info } = useAnimeInfo(id);
  const {
    data: stream,
    error: _error,
    isLoading: _isLoading,
  } = useStreamLinks({
    id: Number(id),
    title: getTitle(info?.Media.title),
    episodeNo: selectedep,
  });
  const navigate = useNavigate();
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [sub, setSub] = useState(true);
  const [iframeError, setIFrameError] = useState(false);
  const handleEpisodeChange = (event: React.MouseEvent<HTMLDivElement>) => {
    // Extract data-ep attribute
    const ep = Number(event.currentTarget.dataset.ep);
    if (!isNaN(ep)) {
      setSelectedEp(ep);
    }
  };
  const changeSubDub = (e: React.MouseEvent<HTMLDivElement>) => {
    const type = e.currentTarget.dataset.type;
    if (type === "sub" || type === "dub") {
      setSub(type === "sub");
    }
  };

  useEffect(() => {
    if (!stream) return;
    if (sub && !stream.links.sub) return;
    else if (!stream.links.dub) return;
    const link = sub ? stream.links.sub : stream.links.dub;
    if (!link) return;
    const timer = setTimeout(() => setSrc(link), 100);
    return () => clearTimeout(timer);
  }, [stream, sub]);
  if (isLoading || !info || !stream || _isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full shrink-0 ">
        <div className="flex gap-2">
          <span className="loader-bar delay-0" />
          <span className="loader-bar delay-150" />
          <span className="loader-bar delay-300" />
        </div>
      </div>
    );
  }
  if (error || _error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <img
            src="/images/error-loli-xs.gif"
            className=" h-32 aspect-square mx-auto"
          />
          <h2 className="text-xl font-semibold text-primary">
            Failed to load anime
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Something went wrong while fetching anime details. Please try again
            later.
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
      </div>
    );
  }

  return (
    <div>
      {!iframeError ? (
        <iframe
          key={src}
          className="mt-20 w-full h-[70svh]"
          src={src}
          allow="fullscreen"
          allowFullScreen
          onError={() => {
            setIFrameError(true);
          }}
        ></iframe>
      ) : (
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
      )}
      <div className="flex flex-wrap gap-2 mt-4">
        {stream?.links.sub && (
          <div
            data-type="sub"
            onClick={changeSubDub}
            className={`flex items-center justify-center 
                 w-15 h-8 
                 rounded-md border border-gray-300 
                 text-sm font-medium
                 cursor-pointer
                 hover:bg-blue-600 hover:text-white
                 transition ${sub ? "bg-primary" : ""}`}
          >
            Sub
          </div>
        )}
        {stream?.links.dub && (
          <div
            data-type="dub"
            onClick={changeSubDub}
            className={`flex items-center justify-center 
                 w-15 h-8 
                 rounded-md border border-gray-300 
                 text-sm font-medium
                 cursor-pointer
                 hover:bg-blue-600 hover:text-white
                 transition ${!sub ? "bg-primary" : ""}`}
          >
            Dub
          </div>
        )}
      </div>

      <div className="my-4 text-xl">Episodes :</div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: stream.publishedEpisodes }).map((_, index) => (
          <div
            onClick={handleEpisodeChange}
            key={index}
            data-ep={index + 1}
            className={`flex items-center justify-center 
                 w-15 h-8 
                 rounded-md border border-gray-300 
                 text-sm font-medium
                 cursor-pointer
                 hover:bg-blue-600 hover:text-white
                 transition ${selectedep === index + 1 ? "bg-primary" : ""}`}
          >
            EP {index + 1}
          </div>
        ))}
      </div>

      <AnimeDetails metadata={info.Media} />
    </div>
  );
}

export default WatchPage;
