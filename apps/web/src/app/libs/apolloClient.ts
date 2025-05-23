import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // set to true for SSR
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_ANILIST_END_POINT, // change this
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

export default client;
