import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  Check,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import CreateComment from "../common/forms/CreateComment";
import EpisodeComments from "./EpisodeComments";

interface IComments {
  animeId: string;
  episode: number;
}
type SortType = "new" | "old";
function Comments({ animeId, episode }: IComments) {
  const [sortByNew, setSortByNew] = useState(true);

  const changeSort = (e: React.MouseEvent<HTMLLIElement>) => {
    const sort = e.currentTarget.dataset.sort as SortType | undefined;

    if (!sort) return;

    setSortByNew(sort === "new");
  };
  return (
    <div>
      <div className="text-xl md:text-3xl font-bold flex items-center gap-4 ">
        Comments
        <Button className="bg-transparent border border-primary hover:bg-transparent hover:text-primary cursor-pointer">
          <span>Community guideline</span>{" "}
          <span className="inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white animate-pulse">
            NEW
          </span>
        </Button>
      </div>

      <div className="bg-muted/20 p-4 my-4 rounded-md text-base">
        <div className="flex justify-between ">
          <div className="flex">
            <div className="border-r border-white/30 pr-6 mr-6">
              Episode {episode}
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle className="text-white" fill="white" /> 2400
              comments
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="text-sm flex items-center gap-2 cursor-pointer">
                <span title={sortByNew ? "Newest" : "Oldest"}>Sort By</span>
                {sortByNew ? (
                  <CalendarArrowDown size={14} />
                ) : (
                  <CalendarArrowUp size={14} />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className=" bg-muted p-2 focus:border-none focus:outline-none z-9999"
              align="end"
            >
              <ol>
                <PopoverClose asChild>
                  <li
                    className={`${!sortByNew ? "" : "bg-muted/30"} cursor-pointer flex items-center gap-2`}
                    data-sort="new"
                    onClick={changeSort}
                  >
                    Newest
                    {sortByNew && <Check size={12} />}
                  </li>
                </PopoverClose>

                <PopoverClose asChild>
                  <li
                    className={`${sortByNew ? "" : "bg-muted/30"} cursor-pointer flex items-center gap-2`}
                    data-sort="old"
                    onClick={changeSort}
                  >
                    Oldest
                    {!sortByNew && <Check size={12} />}
                  </li>
                </PopoverClose>
              </ol>
            </PopoverContent>
          </Popover>
        </div>
        {/* TODO:::: THIS SECTION WILL BE AVAILABLE WHSEN USER IS LOGGED IN */}
        <div className="mt-2 ">
          <Card className="w-full p-0.5 px-2 border-none ">
            <CardContent className="px-0">
              <CreateComment type="EPISODE" episodeId={`${animeId}_${episode}`}/>
            </CardContent>
          </Card>
          <EpisodeComments sort={sortByNew ? "new" : "old"} episodeId={`${animeId}_${episode}`}/>
        </div>
      </div>
    </div>
  );
}

export default Comments;
