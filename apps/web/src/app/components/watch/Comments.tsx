import * as z from "zod";
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
  Smile,
} from "lucide-react";
import { useState } from "react";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import { Card, CardContent} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useApiMutation } from "@/app/hooks/useApi";
import { commentResponse, type TComment } from "@/app/types/types";
import { toast } from "sonner";
import useAuthStore from "@/app/store/authStore";
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

interface IComments {
  animeId: string;
  episode: number;
}
type SortType = "new" | "old";
function Comments({ animeId, episode }: IComments) {
  const [sortByNew, setSortByNew] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
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
        target: "EPISODE",
        createdBy: user!.id,
        episodeId:`${animeId}_${episode}`
      });
    },
  });
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
            <CardContent className="flex items-center gap-2 px-0 my-2">
              <Avatar className="self-start " size="lg">
                <AvatarImage
                  src={`https://res.cloudinary.com/dmz0cwtzd/image/upload/v1715690920/xeqy2nknjul9ofgv19gj.png`}
                  alt="user"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <form
                className="w-full flex flex-col gap-3"
                id="leave-comment"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("ds")
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
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type="submit" >
                  Comment
                </Button>
              </Field>
              </form>
            </CardContent>
            {/* <CardFooter className="self-end px-0">
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type="submit" form="bug-report-form">
                  Comment
                </Button>
              </Field>
            </CardFooter> */}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Comments;
