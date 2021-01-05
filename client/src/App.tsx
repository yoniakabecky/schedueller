import { ApolloProvider } from "@apollo/client";
import React from "react";
import { GET_USERS } from "./graphql/queries";
import { useAppApolloClient } from "./hooks/useAppApolloClient";
import Routes from "./Routes";

function App() {
  const client = useAppApolloClient();

  client
    .query({
      query: GET_USERS,
    })
    .then((result) => console.log(result));

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
