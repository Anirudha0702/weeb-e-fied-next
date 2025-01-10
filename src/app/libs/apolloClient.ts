import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ANILIST_END_POINT,  
  cache: new InMemoryCache()
});

export default client;