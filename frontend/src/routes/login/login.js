import React from 'react'

const Login = () => {
    // Add state compatability when login hook is created
  return (
    <form className="login">
        <h3>Log in</h3>
        <label>Email: </label>
        <input type="text" /> 
        <label>Passowrd: </label>
        <input type="password" />
        <button>Login</button>
    </form>
  )
}

export default Login