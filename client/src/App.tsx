import { ApolloProvider } from "@apollo/client";
import React from "react";

import { useAuthApolloClient } from "./hooks/useAuthApolloClient";
import Routes from "./Routes";

function App() {
  const client = useAuthApolloClient();

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
