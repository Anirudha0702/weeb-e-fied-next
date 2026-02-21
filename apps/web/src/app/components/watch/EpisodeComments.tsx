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
      key: [`comments-${episodeId}`],
    });
  const fetchedComments = data?.pages.flatMap((data) => data.comments) || [];
  if (isFetching) {
    return Array.from({ length: 5 }).map(() => (
      <div className="space-y-3 rounded-xl border p-4 mx-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-2 w-full animate-pulse rounded bg-muted" />
        <div className="h-2 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-16 w-full animate-pulse rounded-lg bg-muted" />
      </div>
    ));
  }
  if(error) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <img src="/images/anya-cry.gif" alt="Error" className="w-24 h-16" />
        <div className="text-2xl font-bold text-white">Failed to load comments</div>
        <p className="text-sm text-white/60">An error occurred while fetching comments. Please try again later.</p>
      </div>
    )
  }
  if(fetchedComments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <div className="text-2xl font-bold text-white">No comments yet</div>
        <p className="text-sm text-white/60">Be the first to comment on this episode!</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {fetchedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} episodeId={episodeId} />
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="text-sm text-blue-400 hover:underline mx-4 cursor-pointer"
        >
          Load more comments
        </button>
      )}
    </div>
  );
}

export default EpisodeComments;
