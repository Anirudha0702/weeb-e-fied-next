import type { TcommentWithUser } from "@/app/types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Heart, Reply } from "lucide-react";
import { useState } from "react";
import CreateComment from "./forms/CreateComment";
import { formatDistanceToNow } from "date-fns";
interface CommentProps {
  comment: TcommentWithUser;
  episodeId: string;
}
function Comment({ comment, episodeId }: CommentProps) {
  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState(false);

  const MAX_LENGTH = 500;
  const isLong = comment.content.length > MAX_LENGTH;

  const content =
    expanded || !isLong
      ? comment.content
      : comment.content.slice(0, MAX_LENGTH) + "…";
  return (
    <div>
      <div className="flex items-start gap-4">
        <Avatar className="self-start " size="lg">
          <AvatarImage src={comment.user.profilePicture!} alt="user" />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-semibold">{comment.user.name} <span className="ml-4 text-white/50 text-xs font-normal">{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span></div>
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
              <Heart size={16} />
              52
            </div>

            <div
              className="text-xs text-white/60 flex items-center gap-1 hover:text-primary cursor-pointer"
              onClick={() => setReply(!reply)}
            >
              <Reply size={16} />
              Reply
            </div>
            
          </div>
          <div className="my-2 text-sm text-white font-semi-bold flex items-center gap-1 hover:text-primary cursor-pointer w-fit">
              <ChevronDown size={16}/> view {comment.replyCount} replies 
            </div>
          {reply && (
            <CreateComment
              type="EPISODE"
              parentId={comment.id}
              episodeId={episodeId}
              isReply
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
