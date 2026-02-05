import * as z from "zod";

export type TSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
export type TStatus =
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "FINISHED"
  | "HIATUS";
export type TMediaTitle = {
  english: string;
  native: string;
  romaji: string;
  userPreferred: string;
};
export type TCoverImage = {
  color: string;
  medium: string;
  large: string;
  extraLarge: string;
};
export type TWatchListOptions =
  | "watching"
  | "completed"
  | "onHold"
  | "dropped"
  | "planToWatch"
  | "remove";

export const commentResponse = z.object({
  id: z.uuid(),
  content: z.string(),
  gif: z.string().nullable(),
  postId: z.uuid().nullable(),
  episodeId: z.string().nullable(),
  parentId: z.string().nullable(),
  userId: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TComment=z.infer<typeof commentResponse>