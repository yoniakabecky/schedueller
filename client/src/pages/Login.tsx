import { useMutation } from "@apollo/client";
import React, { ReactElement } from "react";
import { LOGIN } from "../graphql/mutations";
import { useAuthToken } from "../hooks/useAuthToken";
import { LoginInput, LoginResponse } from "../types/auth";

interface Props {}

export default function Login(props: Props): ReactElement {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [, setAuthToken] = useAuthToken();

  const [login, { error }] = useMutation<LoginResponse, LoginInput>(LOGIN, {
    update: (cache, { data }) => {
      setAuthToken(data!.login.token);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      await login({
        variables: { data: { email, password } },
      });
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p>Error</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
