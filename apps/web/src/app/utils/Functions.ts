import { TSeason } from "../types";

export const fuzzyDateInt = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const fuzzyDateInt = parseInt(year + month + day);

  console.log(fuzzyDateInt);
};
export const getCurrentSeason = (): TSeason => {
  const month = new Date().getMonth();
  if ([0, 1, 11].includes(month)) return "WINTER";
  else if ([2, 3, 4].includes(month)) return "SPRING";
  else if ([5, 6, 7].includes(month)) return "SUMMER";
  else return "FALL";
};

export const getImageUrl = (obj: Record<string, string | undefined>) => {
  const { extraLarge, large, medium, small, bannerImage } = obj;
  if (bannerImage) return bannerImage;
  if (extraLarge) return extraLarge;
  if (large) return large;
  if (medium) return medium;
  if (small) return small;
  return "";
};
export const getTitle = (obj: Record<string, string | undefined>) => {
  const { romaji, english, native, userPreferred } = obj;
  if (userPreferred) return userPreferred;
  if (romaji) return romaji;
  if (english) return english;
  if (native) return native;
  return "";
};
const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const formatDate = (date: {
  year: number | null;
  month: number | null;
  day: number | null;
}) => {
  const { year, month, day } = date;
  if (!year && !month && !day) return "Unknown";

  return `${monthNames[month ?? 0]} ${day ?? ""}, ${year ?? ""}`;
};
