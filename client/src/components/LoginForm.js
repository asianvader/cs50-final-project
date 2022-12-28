import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { constants, BASEURL } from "../constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  // Create an initial state for the form data
  // Can be reused to reset form
  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  // Dependencies for form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm(INITIAL_STATE);

  const submittedFormData = async (data) => {
    console.log(data);
    try {
      // Check user in db
      const result = await axios.post(`${BASEURL}/login`, data);
      console.log(result.data);
      // Username and password are correct
      const message = result.data;
      console.log(Object.keys(message));
      if (Object.keys(message)[0] === "access_token") {
        console.log("success", result.data);
        props.setToken(result.data.access_token);
        navigate("/welcome");
      } else {
        setMessage(result.data.message)
        console.log(result.data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Reset input fields if forms has been submitted
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        submittedFormData(data);
      })}
    >
      {message && <p>{message}</p>}
      <div>
        <label htmlFor="username">Username</label>
        <input {...register("username", { required: "This is required" })} />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register("password", { required: "This is required" })} />
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
