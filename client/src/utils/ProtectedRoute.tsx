import React, { ReactElement } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthToken } from "../hooks/useAuthToken";

interface Props {
  component: React.ComponentType<RouteProps>;
  path: string;
}

export default function ProtectedRoute({
  component: Component,
  path,
  ...rest
}: Props): ReactElement {
  const [authToken] = useAuthToken();
  // TODO: const me = getAccountInfo();
  const me = "hello";

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken && me ? (
          <Component {...props} path={path} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
