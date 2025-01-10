'use client';
import { getCurrentSeason } from "../utils/Functions";
import { getTopSearchOfSeason } from "../utils/quries";
import { Box } from "@mui/material";
import Image from "next/image";
import { status } from "../utils/aliases";
import client from "../libs/apolloClient";
import { useEffect, useState } from "react";
const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
const getTopSearches=async()=>{
    await delay(5000)
    const {data,loading,error}=await client.query({
        query:getTopSearchOfSeason,
        variables:{
            page:1,
            sort:["POPULARITY_DESC"],
            season:getCurrentSeason(),
            status:status.RELEASING,
            perPage:10
        }
    })
    return {data,loading,error}
}
const TopSearch = () => {
    const [data,setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, loading, error } = await getTopSearches();
                setData(data);
                setLoading(loading);
                setError(error ? "Error loading data" : null);
            } catch (err) {
                setError("An error occurred");
            }
        };
        
        fetchData();
    }, []);

  return (
    <div>
      {
        loading?<Box>Loading...</Box>:
        error?<Box>Error...</Box>:
        <Box>
          <h1>Top Searches</h1>
          <Box className="">
            {
              data.Page.media.map((media:any)=>(
                <Box key={media.id} className="flex flex-col items-center">
                  <Image src={media.coverImage.medium} width={100} height={100} alt=""/>
                  <h2>{media.title.userPreferred}</h2>
                </Box>
              ))
            }
          </Box>
        </Box>
      }
    </div>
  );
};

export default TopSearch;
