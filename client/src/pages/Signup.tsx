import React, { ReactElement } from "react";

interface Props {}

export default function Signup(props: Props): ReactElement {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <br />

        <p>Account Type:</p>
        <input type="radio" id="company" name="accountType" value="company" />
        <label htmlFor="company">Company</label>
        <br />
        <input type="radio" id="user" name="accountType" value="user" />
        <label htmlFor="user">User</label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
