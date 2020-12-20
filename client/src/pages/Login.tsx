import React from 'react'

interface Props {

}

const Login = (props: Props) => {
  const handleSubmit = () => {
    console.log("submit")
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" /><br /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login

