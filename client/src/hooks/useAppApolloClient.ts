import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_ENDPOINT,
});

const cache = new InMemoryCache();

export const useAppApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache,
  });
};
