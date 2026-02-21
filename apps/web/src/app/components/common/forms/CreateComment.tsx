import useAuthStore from "@/app/store/authStore";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import { useApiMutation } from "@/app/hooks/useApi";
import { comment as Comment, type TComment } from "@/app/types/types";
import { toast } from "sonner";
import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import GiF from "../GiF";
interface IComment {
  type: "EPISODE" | "POST";
  episodeId?: string;
  isReply?: boolean;
  parentId?: string;
  onSuccess?: (data: TComment) => void;
  onCancel?: () => void;
}
const formSchema = z.object({
  comment: z.string().min(10),
});
const commentSchema = z.object({
  comment: z.string(),
  target: z.literal(["EPISODE", "POST"]),
  episodeId: z.string(),
  createdBy: z.uuid(),
  parentId: z.string().nullable(),
});
type ComentRequest = z.infer<typeof commentSchema>;

function CreateComment({
  type,
  episodeId,
  isReply,
  parentId,
  onSuccess,
  onCancel,
}: IComment) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [openGif, setOpenGif] = useState(false);
  const comment = useApiMutation<TComment, ComentRequest>(
    {
      endpoint: "/comment/create",
      method: "POST",
      responseSchema: Comment,
      payloadSchema: commentSchema,
      key: isReply ? [`reply-${parentId}`] : [`comments-${episodeId}`],
    },
    {
      onSuccess: (data) => {
        toast.success("Comment added successfully");
        form.reset();
        onSuccess?.(data);
      },
      onError: () => {
        toast.error("Failed to post comment");
        onCancel?.();
      },
    },
  );
  const form = useForm({
    defaultValues: {
      comment: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      comment.mutate({
        comment: value.comment,
        target: type,
        createdBy: user!.id,
        episodeId: episodeId!,
        parentId: parentId || null,
      });
    },
  });
  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };
  const canRender =
    user && (!isReply || parentId) && (type !== "EPISODE" || episodeId);

  if (!canRender) return null;
  return (
    <div className="flex items-center gap-2 px-0 my-2 w-full">
      {" "}
      <Avatar className="self-start " size="lg">
        <AvatarImage src={user.profilePicture!} alt="user" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <form
        className="w-full flex flex-col gap-3"
        id="leave-comment"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("ds");
          form.handleSubmit();
        }}
      >
        <div className="w-full flex  gap-2">
          <FieldGroup>
            <form.Field
              name="comment"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Leave a comment"
                        rows={6}
                        className=" h-20 resize-none"
                        aria-invalid={isInvalid}
                      />

                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverTrigger asChild>
              <Smile className="h-5 w-5 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
              <EmojiPicker
                className="h-85.5 z-9999"
                onEmojiSelect={({ emoji }) => {
                  form.setFieldValue(
                    "comment",
                    form.getFieldValue("comment") + emoji,
                  );
                }}
              >
                <EmojiPickerSearch />
                <EmojiPickerContent />
                <EmojiPickerFooter />
              </EmojiPicker>
            </PopoverContent>
          </Popover>
          <div className="">
            <Popover onOpenChange={setOpenGif} open={openGif}>
              <PopoverTrigger asChild>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <rect
                    width="24"
                    height="24"
                    rx="4"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    GIF
                  </text>
                </svg>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0">
                {/* <EmojiPicker
                  className="h-85.5 z-9999"
                  onEmojiSelect={({ emoji }) => {
                    form.setFieldValue(
                      "comment",
                      form.getFieldValue("comment") + emoji,
                    );
                  }}
                >
                  <EmojiPickerSearch />
                  <EmojiPickerContent />
                  <EmojiPickerFooter />
                </EmojiPicker> */}
                <GiF onSelect={(gif) => console.log(gif)} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Field orientation="horizontal" className="justify-end pr-7">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Comment</Button>
        </Field>
      </form>
    </div>
  );
}

export default CreateComment;
