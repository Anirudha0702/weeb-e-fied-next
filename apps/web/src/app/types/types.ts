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
