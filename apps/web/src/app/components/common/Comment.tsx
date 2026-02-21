import type {
  TAllCommentsResponse,
  TcommentWithUserLike,
} from "@/app/types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Heart, Reply } from "lucide-react";
import { useState } from "react";
import CreateComment from "./forms/CreateComment";
import { formatDistanceToNow } from "date-fns";
import { useApiInfinite, useApiMutation } from "@/app/hooks/useApi";
import type { TComment } from "@/app/types/types";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import useAuthStore from "@/app/store/authStore";
import { toast } from "sonner";
interface CommentProps {
  comment: TcommentWithUserLike;
  episodeId: string;
}
function Comment({ comment: propComment, episodeId }: CommentProps) {
  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [fetchReply, setFetchReply] = useState(false);
  const [reply, setReply] = useState(false);
  const queryClient = useQueryClient();
  const [comment, setComment] = useState(propComment);
  const user = useAuthStore((state) => state.user);
  const { isFetching, data, error, fetchNextPage, hasNextPage } =
    useApiInfinite<TAllCommentsResponse>({
      endpoint: `/comment/reply/${comment.id}`,
      method: "GET",
      queryParams: {
        sort: "new",
        limit: 20,
      },
      key: [`replies-${comment.id}`],
      enable: !comment.parentId && fetchReply && comment.replyCount > 0,
    });
  const likeUnlike = useApiMutation(
    {
      endpoint: `/comment/${comment.likedByCurrentUser ? `unlike/${comment.id}` : `like/${comment.id}`}`,
      method: "POST",
      key: [`like-unlike-${comment.id}`],
    },
    {
      onSuccess: () => {
        queryClient.setQueryData(
          [
            comment.parentId
              ? `replies-${comment.parentId}`
              : `comments-${comment.episodeId}`,
          ],
          (oldData: InfiniteData<TAllCommentsResponse> | undefined) => {
            if (!oldData || !user) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  comments: page.comments.map((c) => {
                    if (c.id === comment.id) {
                      const likedByCurrentUser = !comment.likedByCurrentUser;
                      const likeCount = likedByCurrentUser
                        ? (comment.likeCount ?? 0) + 1
                        : (comment.likeCount ?? 0) - 1;
                      setComment((prev) => ({
                        ...prev,
                        likedByCurrentUser,
                        likeCount,
                      }));
                      return {
                        ...c,
                        likedByCurrentUser,
                        likeCount,
                      };
                    }
                    return c;
                  }),
                };
              }),
            };
          },
        );
        toast.success(
          comment.likedByCurrentUser ? "Comment unliked" : "Comment liked",
        );
      },
      onError: () => {
        toast.error("Failed to like/unlike comment. Please try again.");
      },
    },
  );
  const MAX_LENGTH = 500;
  const isLong = comment.content.length > MAX_LENGTH;

  const content =
    expanded || !isLong
      ? comment.content
      : comment.content.slice(0, MAX_LENGTH) + "…";
  const fetchReplies = () => {
    setFetchReply(true);
  };

  const onReplySuccess = (reply: TComment) => {
    setReply(false);
    queryClient.setQueryData(
      [`replies-${comment.id}`],
      (oldData: InfiniteData<TAllCommentsResponse> | undefined) => {
        if (!oldData || !user) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page, index: number) => {
            if (index === 0) {
              return {
                ...page,
                comments: [
                  {
                    ...reply,
                    user: {
                      id: reply.userId,
                      name: user.name!,
                      profilePicture: user.profilePicture!,
                    },
                  },
                  ...page.comments,
                ],
              };
            }
            return page;
          }),
        };
      },
    );
    setComment((prev) => ({
      ...prev,
      replyCount: prev.replyCount + 1,
    }));
    setShowReply(true);
  };
  const replies = data?.pages.flatMap((data) => data.comments) || [];
  return (
    <div onMouseEnter={fetchReplies}>
      <div className="flex items-start gap-4">
        <Avatar className="self-start " size="lg">
          <AvatarImage src={comment.user.profilePicture!} alt="user" />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="w-full pr-2">
          <div className="text-sm font-semibold">
            {comment.user.name}{" "}
            <span className="ml-4 text-white/50 text-xs font-normal">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
          </div>
          <div className="text-sm text-white/80">
            {content}{" "}
            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 text-xs text-blue-400 hover:underline"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          {comment.gif && (
            <div className="mt-2">
              <img
                src={comment.gif}
                alt="Comment GIF"
                className="max-w-xs rounded-md"
              />
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            <div className="text-xs text-white/60 flex items-center gap-1 hover:text-primary cursor-pointer">
              <Heart
                size={16}
                fill={comment.likedByCurrentUser ? "currentColor" : "none"}
                onClick={() => likeUnlike.mutate(undefined)}
              />
              {comment.likeCount ?? 0}
            </div>

            <div
              className={`${comment.parentId ? "hidden" : ""} text-xs text-white/60 flex items-center gap-1 hover:text-primary cursor-pointer`}
              onClick={() => !comment.parentId && setReply(!reply)}
            >
              <Reply size={16} />
              Reply
            </div>
          </div>
          <div
            className={` ${comment.replyCount > 0 ? "" : "hidden"} my-2 text-sm text-white font-semi-bold flex items-center gap-1 hover:text-primary cursor-pointer w-fit`}
            onClick={() => setShowReply(!showReply)}
          >
            <ChevronDown size={16} /> {showReply ? "Hide" : "Show"}{" "}
            {comment.replyCount} replies
          </div>
          {reply && (
            <CreateComment
              type="EPISODE"
              parentId={comment.id}
              episodeId={episodeId}
              isReply
              onSuccess={onReplySuccess}
              onCancel={() => setReply(false)}
            />
          )}
          {showReply && (
            <div className="mt-4 space-y-4">
              {isFetching && (
                <div className="space-y-3 rounded-xl border p-4">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                  <div className="h-2 w-full animate-pulse rounded bg-muted" />
                  <div className="h-2 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="h-16 w-full animate-pulse rounded-lg bg-muted" />
                </div>
              )}
              {error && (
                <div className="flex flex-col items-center gap-4 py-10">
                  <img
                    src="/images/anya-cry.gif"
                    alt="Error"
                    className="w-24 h-16"
                  />
                  <div className="text-2xl font-bold text-white">
                    Failed to load comments
                  </div>
                  <p className="text-sm text-white/60">
                    An error occurred while fetching comments. Please try again
                    later.
                  </p>
                </div>
              )}
              <div className="border-l border-white/20  pl-3 mt-4">
                {replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    episodeId={episodeId}
                  />
                ))}
                {hasNextPage && (
                  <button
                    onClick={() => fetchNextPage()}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Load more replies
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
