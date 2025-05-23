import { getCurrentSeason } from "../utils/Functions";
import { getTopSearchOfSeason, TGetTopSearchOfSeason } from "../utils/quries";
import { status } from "../utils/aliases";
import client from "../libs/apolloClient";
import { ApolloError } from "@apollo/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
    <div>
      
      <div
      >Top Searches:   &nbsp;
        {medias.map((media) => (
          <Link key={media.id} style={{ color: "white", fontSize: '14px' }} href={`/info/${media.id}`}>
            {media.title.english},
          </Link>
        ))}
      </div>
      <Button className="bg-red-500 text-green-500" >
        <Image src="/back-arrow-outline-circular.svg" alt="back" width={20} height={20} className="text-pink-950"/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
</svg>
      </Button>
    </div>
  );
};

export default TopSearchName;
