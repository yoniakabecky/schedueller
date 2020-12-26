import React, { ReactElement } from "react";

interface Props {}

export default function Login(props: Props): ReactElement {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
