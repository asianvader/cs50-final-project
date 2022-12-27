import axios from "axios";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { constants, BASEURL } from "../constants";
import { useForm } from "react-hook-form";

const RegisterUserForm = () => {
  // Create an initial state for the form data
  // Can be reused to reset form
  const INITIAL_STATE = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  // Dependencies for form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm(INITIAL_STATE);

  const submittedFormData = async (data) => {
    console.log(data);
    try {
      // Post data to DB
      await axios.post(`${BASEURL}/register`, data);

      // Redirect to login page
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "This is required",
            validate: (val) => {
              if (watch("password") !== val) {
                return "Your passwords do not match.";
              }
            },
          })}
        />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export { RegisterUserForm };
