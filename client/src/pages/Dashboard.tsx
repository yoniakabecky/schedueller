import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useLogout } from "../hooks/useAuthToken";

interface Props {}

export default function Dashboard(props: Props): ReactElement {
  const history = useHistory();
  const logout = useLogout();

  return (
    <div>
      <h1>Dashboard</h1>

      <button
        onClick={() => {
          logout();
          history.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
