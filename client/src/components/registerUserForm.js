import axios from "axios";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { constants, BASEURL } from "../constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap/";

const RegisterUserForm = () => {
  const navigate = useNavigate();
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
      // Redirect user to login page
      navigate("/login");
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
        submittedFormData(data);
      })}
    >
      <Form.Group>
        <Form.Label className="mb-3" htmlFor="username">
          Username
        </Form.Label>
        <Form.Control
          {...register("username", { required: "This is required" })}
        />
        <p className="errors">{errors.username?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-3" htmlFor="password">
          Password
        </Form.Label>
        <Form.Control
          type="password"
          {...register("password", { required: "This is required" })}
        />
        <p className="errors">{errors.password?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-3" htmlFor="confirmPassword">
          Confirm Password
        </Form.Label>
        <Form.Control
          type="password"
          {...register("confirmPassword", {
            required: "This is required",
            validate: (val) => {
              if (watch("password") !== val) {
                return "Your passwords do not match.";
              }
            },
          })}
        />
        <p className="errors">{errors.confirmPassword?.message}</p>
      </Form.Group>
      <Button className="btn" type="submit">
        Register
      </Button>
    </Form>
  );
};

export { RegisterUserForm };
