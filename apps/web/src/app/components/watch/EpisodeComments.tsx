import { useApiInfinite } from "@/app/hooks/useApi";
import type { TAllCommentsResponse } from "@/app/types/api";
import Comment from "../common/Comment";

interface IEpisodeComments {
  episodeId: string;
  sort: "new" | "old";
}
function EpisodeComments({ episodeId, sort }: IEpisodeComments) {
  const { isFetching, data, error, fetchNextPage, hasNextPage } =
    useApiInfinite<TAllCommentsResponse>({
      endpoint: `/comment/episode/${episodeId}`,
      method: "GET",
      queryParams: {
        sort,
        limit: 20,
      },
    });
    console.log(data)
  const fetchedComments =
    data?.pages.flatMap((data) => data.comments) || [];
  return (
    <div className="space-y-4">
      {fetchedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} episodeId={episodeId} />
      ))}
    </div>
  );
}

export default EpisodeComments;
