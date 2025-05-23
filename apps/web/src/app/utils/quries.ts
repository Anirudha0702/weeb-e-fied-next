import { gql } from "@apollo/client";
import { TCoverImage, TMediaTitle } from "../types";
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

export const getAnimeDetails = gql`
  query ($mediaId: Int) {
    Media(id: $mediaId) {
      bannerImage
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
    }
  }
`;

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
export type TAnimeDetailsResponse = {
  Media: {
    bannerImage: string;
    coverImage: TCoverImage;
    genres: string[];
    id: number;
    description: string;
    duration: number;
    endDate: {
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
      };
    };
    episodes: number;
    externalLinks: {
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
    }[];
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
      id: number;
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
  };
};
