import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../constants";

const Header = (props) => {
  const navigate = useNavigate();
  function logOut() {
    axios
      .post(`${BASEURL}/logout`)
      .then(() => {
        props.token();
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
    <header className="App-header">
      <button onClick={logOut}>Logout</button>
    </header>
  );
};

export default Header;
