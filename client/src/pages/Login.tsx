import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import { useAuthToken } from "../hooks/useAuthToken";

interface Props {}

export default function Login(props: Props): ReactElement {
  const [login] = useLoginMutation();
  const [, setAuthToken] = useAuthToken();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await login({
      variables: {
        data: {
          email,
          password,
        },
      },
    });

    if (res && res.data) {
      setAuthToken(res.data.login.token);
      // getAccountInfo(res.data.login);
      history.push("/dashboard");
    } else {
      // TODO: handle errors
      console.error(res);
    }
  };

  return (
    <div>
      <h1>Login</h1>

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
