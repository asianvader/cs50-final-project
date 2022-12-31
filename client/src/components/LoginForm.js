import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { constants, BASEURL } from "../constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap/";

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
    console.log(data.username, data.password);
    try {
      // Check user in db
      const result = await axios.get(
        `${BASEURL}/login/${data.username}/${data.password}`
      );
      console.log(result.data);
      // Username and password are correct
      const message = result.data;
      console.log(Object.keys(message));
      if (Object.keys(message)[0] === "access_token") {
        console.log("success", result.data);
        // Add token to local storage
        props.setToken(result.data.access_token);
        // Add username to local storage
        sessionStorage.setItem("username", data.username);
        // Redirect to main menu
        navigate("/main-menu", { state: { username: data.username } });
      } else {
        setMessage(result.data.message);
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
    <Form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        submittedFormData(data);
      })}
    >
      {message && <p>{message}</p>}
      <Form.Group>
        <Form.Label className="mb-3" htmlFor="username">
          Username
        </Form.Label>
        <Form.Control
          type="text"
          {...register("username", { required: "This is required" })}
        />
        <p className="errors">{errors.username?.message}</p>
      </Form.Group>

      <Form.Group>
      <Form.Label className="mb-3" htmlFor="password">Password</Form.Label>
      <Form.Control type="password"{...register("password", { required: "This is required" })} />
        <p className="errors">{errors.password?.message}</p>
      </Form.Group>
      <Button variant="primary" type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
