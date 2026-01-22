import type { TMediaTitle, TSeason } from "../types/types";

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

export const getStartEndOfWeek = () => {
  const now = new Date();

  // Monday = start of week (UTC)
  const startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - ((now.getUTCDay() + 6) % 7));
  startOfWeek.setUTCHours(0, 0, 0, 0);

  // Sunday = end of week (UTC)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  endOfWeek.setUTCHours(23, 59, 59, 999);

  return {
    start: Math.floor(startOfWeek.getTime() / 1000),
    end: Math.floor(endOfWeek.getTime() / 1000),
  };
};
export const getTitle = (title?: TMediaTitle) => {
  if (!title) return "";
  return title.english || title.romaji || title.native || "Unknown Title";
};
export const getImageUrl = (obj: Record<string, string | undefined>) => {
  const { extraLarge, large, medium, small, bannerImage } = obj;
  if (bannerImage) return bannerImage;
  if (extraLarge) return extraLarge;
  if (large) return large;
  if (medium) return medium;
  if (small) return small;
  return "https://imgs.search.brave.com/VcxLz7-BY3z6UOo6gPii2J8aRW_17o6HE5q7K77tQq0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzBkLzIz/L2ViLzBkMjNlYjk1/ZjJhOTZmMWY0ZDVh/YWU5YjRmZTc5MWZi/LmpwZw";
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
