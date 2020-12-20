import React from 'react'
import { Link } from 'react-router-dom'

interface Props {

}

const Home = (props: Props) => {
  return (
    <div>
      <h1>Schedueller</h1>

      <Link to="login">Login</Link>
      <br />
      <Link to="signup">Signup</Link>
    </div>
  )
}

export default Home
