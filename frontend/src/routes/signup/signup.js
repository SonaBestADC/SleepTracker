import React from 'react'

const Signup = () => {
    // Add state compatability when signup hook is created
  return (
    <form className="Sign up">
        <h3>Log in</h3>
        <label>Email: </label>
        <input type="text" /> 
        <label>Passowrd: </label>
        <input type="password" />
        <button>Sign up</button>
    </form>

  )
}

export default Signup