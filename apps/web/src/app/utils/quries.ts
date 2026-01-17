import { gql } from "graphql-request";
import type {
  TCoverImage,
  TMediaTitle,
  TSeason,
  TStatus,
} from "../types/types";
/**
 * @requires page: Int
 * @requires sort: [MediaSort]
 * @requires season: MediaSeason
 * @requires status: MediaStatus
 * @requires perPage: Int
 */
export const getTopSearchOfSeason = gql`
  query (
    $page: Int
    $sort: [MediaSort]
    $season: MediaSeason
    $status: MediaStatus
    $perPage: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
      }
      media(sort: $sort, season: $season, status: $status) {
        title {
          english
          native
          romaji
          userPreferred
        }
        id
        coverImage {
          color
          medium
        }
      }
    }
  }
`;
export const getPopularAnimes = gql`
  query (
    $type: MediaType
    $sort: [MediaSort]
    $season: MediaSeason
    $page: Int
    $perPage: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
      }
      media(type: $type, sort: $sort, season: $season) {
        id
        coverImage {
          medium
          large
          extraLarge
          color
        }
        bannerImage
        description
        title {
          english
          native
          romaji
          userPreferred
        }
        episodes
        format
        genres
      }
    }
  }
`;
export const getLatestAnimes = gql`
  query ($season: MediaSeason, $year: Int, $type: MediaType) {
    Page(page: 1, perPage: 20) {
      media(type: $type, season: $season, seasonYear: $year) {
        id
        coverImage {
          medium
          large
          extraLarge
          color
        }
        bannerImage
        description
        title {
          english
          native
          romaji
          userPreferred
        }
        episodes
        format
        genres
      }
    }
  }
`;
export const getTrendingAnimes = gql`
  query (
    $season: MediaSeason
    $year: Int
    $type: MediaType
    $sort: [MediaSort]
  ) {
    Page(page: 1, perPage: 30) {
      media(type: $type, season: $season, seasonYear: $year, sort: $sort) {
        id
        coverImage {
          medium
          large
          extraLarge
          color
        }
        bannerImage
        description
        title {
          english
          native
          romaji
          userPreferred
        }
        episodes
        format
        genres
      }
    }
  }
`;
export const getAiringSchedule = gql`
  query ($start: Int!, $end: Int!) {
    Page(page: 1, perPage: 50) {
      pageInfo {
        hasNextPage
        total
        perPage
        currentPage
        lastPage
      }
      airingSchedules(
        airingAt_greater: $start
        airingAt_lesser: $end
        sort: [TIME_DESC]
      ) {
        airingAt
        episode
        media {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          season
          seasonYear
          status
        }
      }
    }
  }
`;

export const getAnimeDetails = gql`
  query ($mediaId: Int) {
    Media(id: $mediaId) {
      bannerImage
      countryOfOrigin
      favourites
      coverImage {
        color
        extraLarge
        large
        medium
      }
      genres
      id
      description
      duration
      endDate {
        year
        day
        month
      }
      studios {
        nodes {
          name
        }
      }
      averageScore
      characters {
        nodes {
          id
          age
          bloodType
          dateOfBirth {
            day
            month
            year
          }
          description
          image {
            large
            medium
          }
          gender
          name {
            full
            last
            first
            middle
          }
        }
      }
      episodes
      externalLinks {
        site
        siteId
        type
        url
        language
        notes
        color
        icon
        id
        isDisabled
      }
      hashtag
      idMal
      isAdult
      isFavourite
      meanScore
      title {
        english
        native
        romaji
        userPreferred
      }
      popularity
      rankings {
        allTime
        season
        rank
        context
        format
        type
        id
        year
      }
      startDate {
        day
        month
        year
      }
      trending
      trailer {
        site
        id
        thumbnail
      }
      tags {
        description
        id
        name
        userId
        rank
      }
      type
      stats {
        scoreDistribution {
          amount
          score
        }
        statusDistribution {
          amount
          status
        }
      }
      status
      format
      season
    }
  }
`;
export type TMediaListStatus =
  | "CURRENT"
  | "PLANNING"
  | "DROPPED"
  | "PAUSED"
  | "REPEATING";
export type TMediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";
export type TMediaFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";
export type TStats = {
  scoreDistribution: {
    amount: number;
    score: number;
  }[];
  statusDistribution: {
    amount: number;
    status: TMediaListStatus;
  }[];
};

export type TResponseWithPageInfo = {
  Page: {
    pageInfo: TPageInfo;
    media: {
      id: number;
      coverImage: TCoverImage;
      bannerImage: string;
      description: string;
      title: TMediaTitle;
      episodes: number;
      format: string;
      genres: string[];
    }[];
  };
};
export type TResponsePopularAnimes = {
  Page: {
    media: {
      id: number;
      coverImage: TCoverImage;
      bannerImage: string;
      description: string;
      title: TMediaTitle;
      episodes: number;
      format: string;
      genres: string[];
    }[];
  };
};

export type TSchedule = {
  airingAt: number;
  episode: number;
  media: {
    id: number;
    title: TMediaTitle;
    season: TSeason;
    seasonYear: string;
    status: TStatus;
  };
};
export type TResponseAiringSchedule = {
  Page: {
    pageInfo: TPageInfo;
    airingSchedules: TSchedule[];
  };
};
type TPageInfo = {
  hasNextPage: boolean;
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
};
type TCustomMedia = {
  title: TMediaTitle;
  id: number;
  coverImage: TCoverImage;
};
export type TGetTopSearchOfSeason = {
  Page: {
    pageInfo: {
      currentPage: number;
    };
    media: TCustomMedia[];
  };
};
export type TExtraLink = {
  site: string;
  siteId: number;
  type: string;
  url: string;
  language: string;
  notes: string | null;
  color: string | null;
  icon: string | null;
  id: number;
  isDisabled: boolean;
};
export type TAnimeDetailsResponse = {
  Media: {
    bannerImage: string;
    coverImage: TCoverImage;
    genres: string[];
    id: number;
    description: string;
    duration: number;
    endDate: {
      day: number;
      month: number;
      year: number;
    };
    averageScore: number;
    characters: {
      nodes: {
        id: number;
        age: string;
        bloodType: string;
        dateOfBirth: {
          day: number | null;
          month: number | null;
          year: number | null;
        };
        description: string;
        image: {
          large: string;
          medium: string;
        };
        gender: string;
        name: {
          full: string;
          last: string;
          first: string;
          middle: string;
        };
      }[];
    };
    studios: {
      nodes: {
        name:string
      }[]
    };
    countryOfOrigin: string;
    episodes: number;
    favourites: number;
    externalLinks: TExtraLink[];
    hashtag: string;
    idMal: number;
    isAdult: boolean;
    isFavourite: boolean;
    meanScore: number;
    title: TMediaTitle;
    popularity: number;
    rankings: {
      allTime: number;
      season: number;
      rank: number;
      context: string;
      format: string;
      type: string;
      id: number;
      year: number;
    }[];
    startDate: {
      day: number;
      month: number;
      year: number;
    };
    trending: number | null;
    trailer: {
      site: string;
      id: string;
      thumbnail: string;
    };
    tags: {
      description: string;
      id: number;
      name: string;
      userId: number;
      rank: number;
    }[];
    type: "ANIME";
    stats: TStats;
    status: TStatus;
    format: TMediaFormat;
    season: TSeason;
  };
};
