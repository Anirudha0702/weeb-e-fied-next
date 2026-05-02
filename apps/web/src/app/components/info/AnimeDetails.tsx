import { useApi, useApiMutation } from "@/app/hooks/useApi";
import { watchlistSchema, type TWatchlist } from "@/app/types/api";
import {
  watchlistUpdateSchema,
  type TWatchlistUpdatePayload,
} from "@/app/types/types";
import { formatDate, getTitle } from "@/app/utils/Functions";
import type { TAnimeDetailsResponse } from "@/app/utils/quries";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CirclePlus,
  Clock3,
  ClosedCaption,
  Hd,
  Play,
  Share2,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface IAnimeDetails {
  metadata: TAnimeDetailsResponse["Media"];
  showWatchNow?: boolean;
  showCharacters?: boolean;
}

function AnimeDetails({
  metadata,
  showWatchNow,
  showCharacters = true,
}: IAnimeDetails) {
  const [showAll, setShowAll] = useState(false);
  const characters = metadata.characters.nodes;
  const visibleCharacters = characters.slice(0, 6);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: watchlistInfo } = useApi<TWatchlist | null, undefined>({
    endpoint: `/watchlist/inlist/${metadata.id}`,
    method: "GET",
    key: ["watchlist-info", `${metadata.id}`],
    responseSchema: watchlistSchema.nullable(),
  });
  const updateStatus = useApiMutation<TWatchlist, TWatchlistUpdatePayload>(
    {
      endpoint: `/watchlist/update`,
      method: "PUT",
      key: ["watchlist-update"],
      responseSchema: watchlistSchema,
      payloadSchema: watchlistUpdateSchema,
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Watchlist updated successfully");
        queryClient.setQueryData(["watchlist-info", `${metadata.id}`], () => {
          if (variables?.remove) return null;
          return data;
        });
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to update watchlist",
        );
      },
    },
  );
  const chnageStatus = (status: TWatchlist["status"] | "remove") => {
    if (updateStatus.isPending) return;
    updateStatus.mutate({
      mediaId: metadata.id,
      status: status === "remove" ? "planned" : status,
      remove: status === "remove",
    });
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row justify-center md:justify-between py-4">
        <div
          className="flex flex-col md:flex-row gap-4"
          data-testId="rate-title-info-wrapper"
        >
          <div className="items-center gap-2 bg-[#40424a] rounded-sm p-2 w-fit mx-auto flex-col flex h-fit">
            <span className="font-bold text-lg flex items-center justify-center">
              <Star color="yellow " className="mr-2" />
              {metadata.averageScore != null
                ? (metadata.averageScore / 10).toFixed(1)
                : "N/A"}
            </span>
            <span className=" text-sm text-[#999]">
              {metadata.popularity} liked
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl md:text-3xl font-bold text-center md:text-start max-w-98 line-clamp-2">
              {getTitle(metadata.title)}
            </div>
            <div className="md:self-start flex items-center justify-between text-[#999] text-sm gap-2 ">
              {metadata.episodes && (
                <span className="flex gap-2  items-center">
                  <ClosedCaption size={16} /> {metadata.episodes}
                </span>
              )}
              {metadata.duration && (
                <span className="flex gap-2  items-center">
                  <Clock3 size={16} /> {metadata.duration} mins
                </span>
              )}
              <Hd />
              <span className="">{metadata.countryOfOrigin}</span>
            </div>
          </div>
        </div>

        <div
          className={`space-y-2 mx-auto mt-3 md:justify-self-end md:mx-0 ${!showWatchNow ? "hidden" : ""} flex flex-col`}
          data-testId="watch-now-share-list-add-wrapper"
        >
          <div className="flex gap-2 items-center">
            <Button
              className="cursor-pointer p-6 rounded-full  md:w-full min-w-48"
              onClick={() =>
                navigate({
                  to: `/watch/${metadata.id}?${getTitle(metadata.title)}`,
                })
              }
            >
              {" "}
              Watch Now
              <Play className="ml-10" />
            </Button>
          </div>
          <div className="text-[#999] flex gap-2 justify-center w-full">
            {/* <span className=" flex gap-2 text-sm items-center cursor-pointer ">
              <Share2 size={16} />
              Share this
            </span> */}
            <span
              className="flex gap-2 text-sm items-center cursor-pointer"
              // onClick={() => setList(!inList)}
            >
              {!watchlistInfo && (
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => chnageStatus("watching")}
                >
                  <CirclePlus size={16} />
                  Add to watchlist
                </div>
              )}
            </span>
            {watchlistInfo && (
              <Select
                disabled={updateStatus.isPending}
                defaultValue={watchlistInfo.status}
                onValueChange={(value) =>
                  chnageStatus(value as TWatchlist["status"] | "remove")
                }
              >
                <SelectTrigger className="w-full max-w-48 my-1">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="w-full max-w-48 ">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="watching">Watching</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="dropped">Dropped</SelectItem>
                    <SelectItem value="planned">Plan to Watch</SelectItem>
                    <SelectItem value="remove">Remove</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
      <div className="border-l border-l-primary border-dashed text-sm p-3 flex gap-2">
        <div className="share-icon" />
        <div className="">
          <div>SHARE</div>
          <span className="text-primary">ANIME</span>
        </div>
        <Share2 size={32} className="my-1 cursor-pointer" />
      </div>
      <hr className="my-6" />
      <div className="grid md:grid-cols-[2fr_1fr] gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pl-2"
        >
          <h2 className="text-2xl font-semibold mb-6 ">Synopsis</h2>
          <p
            className="text-sm text-muted-foreground block max-w-[1/3]"
            dangerouslySetInnerHTML={{ __html: metadata.description }}
          />

          {visibleCharacters.length > 0 && showCharacters && (
            <>
              <h2 className="text-2xl font-semibold my-6 ">
                Characters & Voice Actors
              </h2>
              <div className="space-y-2 grid lg:grid-cols-2">
                {visibleCharacters.map((character) => (
                  <div
                    key={character.id}
                    className="bg-muted p-4 rounded flex gap-2"
                  >
                    <div className="relative  aspect-square w-12 shrink-0 grow-0 rounded-full">
                      <img
                        src={character.image.medium || character.image.large}
                        alt={character.name.full}
                        className="object-cover rounded-full absolute h-full w-full"
                      />
                    </div>
                    <div className="">
                      <h3 className="font-semibold">{character.name.full}</h3>
                      <p className="text-sm text-muted-foreground">
                        Age: {character.age || "Unknown"}
                        <br />
                        Birthday:{" "}
                        {formatDate(character.dateOfBirth) || "Unknown"}
                      </p>
                      <p
                        title={character.description}
                        className="text-sm text-muted-foreground line-clamp-2 wrap-break-word"
                      >
                        {character.description || ""}
                      </p>
                    </div>
                  </div>
                ))}

                {characters.length > 6 && (
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className=" text-left mt-2 text-sm text-primary hover:underline"
                  >
                    {showAll ? "View less" : "View more"}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>

        <div className="border-l-2 p-2 text-muted-foreground">
          <div className="">
            {metadata.title.native && (
              <span>
                <span className="font-semibold">Japanese</span> :{" "}
                {metadata.title.native}
              </span>
            )}
          </div>
          <div className="">
            {metadata.startDate && (
              <span>
                <span className="font-semibold">
                  {!["RELEASING", "NOT_YET_RELEASED"].includes(metadata.status)
                    ? "Aired"
                    : "Release Date"}
                </span>{" "}
                : {formatDate(metadata.startDate)}
              </span>
            )}
          </div>
          <div className="">
            {!["RELEASING", "NOT_YET_RELEASED"].includes(metadata.status) &&
              metadata.endDate && (
                <span>
                  <span className="font-semibold">Finished</span> :{" "}
                  {formatDate(metadata.endDate)}
                </span>
              )}
          </div>

          <div className="">
            {metadata.genres && (
              <div>
                <div>
                  <span className="font-semibold">Genres</span> :
                </div>
                <div className="text-xs pt-2 flex flex-wrap gap-2">
                  {metadata.genres.map((genre) => (
                    <span className=" border p-1 hover:border-primary hover:text-primary cursor-pointer">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="">
            {metadata.tags && (
              <div>
                <div className="pt-2">
                  <span className="font-semibold ">Tags</span> :
                </div>
                <div className="text-xs py-2 flex flex-wrap gap-2">
                  {metadata.tags.map((tag) => (
                    <span className=" border p-1 hover:border-primary hover:text-primary cursor-pointer">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="">
            {metadata.studios.nodes.length > 0 && (
              <div>
                <div className="pt-2">
                  <span className="font-semibold ">Studios</span> :
                </div>
                <div className="text-xs py-2 flex flex-wrap gap-2">
                  {metadata.studios.nodes.map((studio) => (
                    <span className=" border p-1 hover:border-primary hover:text-primary cursor-pointer">
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
