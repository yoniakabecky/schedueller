import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
