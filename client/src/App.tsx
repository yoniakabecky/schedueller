import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
