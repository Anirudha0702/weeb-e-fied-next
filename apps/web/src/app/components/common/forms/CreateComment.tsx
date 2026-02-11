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
import { commentResponse, type TComment } from "@/app/types/types";
import { toast } from "sonner";
import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
interface IComment {
  type: "EPISODE" | "POST";
  episodeId?: string;
  isReply?: boolean;
  parentId?: string;
}
const formSchema = z.object({
  comment: z.string().min(10),
});
const commentSchema = z.object({
  comment: z.string(),
  target: z.literal(["EPISODE", "POST"]),
  episodeId: z.string(),
  createdBy: z.uuid(),
});
type ComentRequest = z.infer<typeof commentSchema>;

function CreateComment({ type, episodeId, isReply, parentId }: IComment) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const comment = useApiMutation<TComment, ComentRequest>(
    {
      endpoint: "/comment/create",
      method: "POST",
      responseSchema: commentResponse,
      payloadSchema: commentSchema,
    },
    {
      onSuccess: () => {
        toast.success("Comment added successfully");
      },
      onError: () => {
        toast.error("Failed to post comment");
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
      });
    },
  });
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
        </div>
        <Field orientation="horizontal" className="justify-end pr-7">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">Comment</Button>
        </Field>
      </form>
    </div>
  );
}

export default CreateComment;
