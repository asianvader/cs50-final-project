import axios from "axios";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { constants, BASEURL } from "../constants";
import { useForm } from "react-hook-form";

const LoginForm = () => {
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
      if (result.data.message === data.username) {
        console.log("success", result.data.message);
      } else {
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
