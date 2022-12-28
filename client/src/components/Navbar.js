import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../constants";

import { Link } from "react-router-dom";

function Navbar(props) {
  const token = props.token;
  const navigate = useNavigate();
  function logOut() {
    axios
      .post(`${BASEURL}/logout`)
      .then(() => {
        props.removeToken();
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  return (
    <nav>
      <ul>
        {!token && token !== "" && token !== undefined ? (
          <>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <></>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logOut}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
