import React from "react";
import LoginForm from "../components/LoginForm";

const Login = (props) => {
  return (
    <div>
      <h2>Please Login</h2>
      <LoginForm setToken={props.setToken} />
    </div>
  );
};

export default Login;
