import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuthToken } from "./useAuthToken";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_ENDPOINT,
});

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

export const useAuthApolloClient = () => {
  const [authToken] = useAuthToken();

  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache: new InMemoryCache(),
  });
};
