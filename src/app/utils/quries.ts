import { gql } from "@apollo/client";
import { TMediaTitle } from "../types";
/**
 * @requires page: Int
 * @requires sort: [MediaSort]
 * @requires season: MediaSeason
 * @requires status: MediaStatus
 * @requires perPage: Int
 */
export const getTopSearchOfSeason = gql`query($page: Int, $sort: [MediaSort], $season: MediaSeason, $status: MediaStatus, $perPage: Int)  {
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
}`;
type TCustomMedia={
  title:TMediaTitle
  id:number
  coverImage:{
    color:string
    medium:string
  }
}
export type TGetTopSearchOfSeason = {
  Page:{
    pageInfo:{
      currentPage:number
    },
    media:TCustomMedia[]
  }
};
