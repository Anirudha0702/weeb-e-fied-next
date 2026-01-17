import { useNavigate, useParams } from "@tanstack/react-router";
import useAnimeInfo from "../hooks/useAnimeInfo";
import Breadcrumb from "../components/common/Breadcrumb";
import { getTitle } from "../utils/Functions";
import Banner from "../components/info/Banner";
import { Button } from "@/components/ui/button";
import AnimeDetails from "../components/info/AnimeDetails";

function AnimeInfo() {
  const params = useParams({
    from: "/_layout/info/$id",
  });
  const id = params.id;
  const { error, isLoading, data: info } = useAnimeInfo(id);
  const navigate = useNavigate();

  if (isLoading || !info) {
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
  if (error) {
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
    <div className=" pt-20 w-full">
      <Breadcrumb
        items={[
          { label: "Home", href: "/home" },
          { label: "A to Z List", href: "/a-to-z" },
          { label: getTitle(info.Media.title) },
        ]}
      />
      <Banner
        coverImage={info.Media.coverImage}
        bannerImage={info.Media.bannerImage}
        trailer={
          info.Media.trailer?.site === "youtube"
            ? {
                site: info.Media.trailer.site,
                id: info.Media.trailer.id,
                thumbnail: info.Media.trailer.thumbnail,
              }
            : null
        }
      />
      <AnimeDetails metadata={info.Media}/>
    </div>
  );
}

export default AnimeInfo;
