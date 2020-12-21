import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {}

export default function Home(props: Props): ReactElement {
  return (
    <div>
      <h1>Schedueller</h1>

      <Link to="login">Login</Link>
      <br />
      <Link to="signup">Signup</Link>
    </div>
  );
}
