import React from "react";

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;