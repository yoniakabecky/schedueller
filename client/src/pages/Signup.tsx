import { useMutation } from "@apollo/client";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { SIGNUP } from "../graphql/mutations";
import { useAuthToken } from "../hooks/useAuthToken";
import { SignupInput, SignupResponse } from "../types/auth";

interface Props {}

export default function Signup(props: Props): ReactElement {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isCompany, setIsCompany] = React.useState(false);
  const [, setAuthToken] = useAuthToken();
  const history = useHistory();

  const [signup, { error }] = useMutation<SignupResponse, SignupInput>(SIGNUP, {
    update: (cache, { data }) => {
      setAuthToken(data!.signup.token);
      history.push("/dashboard");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup({
      variables: {
        data: {
          email,
          password,
          confirmPassword,
          isCompany,
          displayName,
        },
      },
    });
  };

  return (
    <div>
      <h1>Signup</h1>

      {error && <p>Error</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Display Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <span>Account Type:</span>
        <input
          type="radio"
          id="company"
          name="accountType"
          checked={isCompany === true}
          onChange={() => setIsCompany(true)}
        />
        <label htmlFor="company">Company</label>
        <input
          type="radio"
          id="user"
          name="accountType"
          checked={isCompany === false}
          onChange={() => setIsCompany(false)}
        />
        <label htmlFor="user">User</label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
