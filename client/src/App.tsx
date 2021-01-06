import { ApolloProvider } from "@apollo/client";
import React from "react";
import { useAppApolloClient } from "./hooks/useAppApolloClient";
import Routes from "./Routes";

function App() {
  const client = useAppApolloClient();

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
