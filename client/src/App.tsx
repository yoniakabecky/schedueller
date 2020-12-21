import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      accountId
      userName
      firstName
      lastName
      profileImage
    }
  }
`;

function App() {
  client
    .query({
      query: GET_USERS,
    })
    .then((result) => console.log(result));

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
