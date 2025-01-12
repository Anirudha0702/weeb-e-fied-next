import { getCurrentSeason } from "../utils/Functions";
import { getTopSearchOfSeason, TGetTopSearchOfSeason } from "../utils/quries";
import { Box, Typography } from "@mui/material";
import { status } from "../utils/aliases";
import client from "../libs/apolloClient";
import { ApolloError } from "@apollo/client";
import Link from "next/link";
const getTopSearches = async (): Promise<{
  data: TGetTopSearchOfSeason;
  loading: boolean;
  error: ApolloError | undefined;
}> => {
  const { data, loading, error } = await client.query({
    query: getTopSearchOfSeason,
    variables: {
      page: 1,
      sort: ["POPULARITY_DESC"],
      season: getCurrentSeason(),
      status: status.RELEASING,
      perPage: 10,
    },
  });
  return { data, loading, error };
};
const TopSearchName = async () => {
  const { data, error } = await getTopSearches();
  if (error) throw new Error("Error fetching data");
  const medias = data.Page.media;
  return (
    <Box>
      
      <Typography
        sx={{
          whiteSpace: "nowrap", // Prevents text from wrapping
          overflow: "hidden", // Ensures content is clipped when it overflows
          textOverflow: "ellipsis", // Adds the ellipsis (...)
          display: "block", // Required for ellipsis to work with Typography
          width: "90%", // Adjust as needed for your layout
          color: "white", // Ensures the text color is white
        }}
      >Top Searches:   &nbsp;
        {medias.map((media) => (
          <Link key={media.id} style={{ color: "white", fontSize: '14px' }} href={`/info/${media.id}`}>
            {media.title.english},
          </Link>
        ))}
      </Typography>
    </Box>
  );
};

export default TopSearchName;
