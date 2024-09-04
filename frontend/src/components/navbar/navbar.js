import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // Will 100% need to be redone once api routes are fully supported, user auth, and styling
    <header>
        <div className="container">
            <Link to="/">
                <h1>Sleep Tracker</h1>
            </Link>
            <nav>
                <div className="logOutDiv">
                    <button>Log Out</button>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">register</Link>
                </div>
            </nav>
        </div>
    </header>
  );
}

export default Navbar