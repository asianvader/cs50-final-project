import axios from "axios";
import React, { useState } from "react";
import { format } from "date-fns";
import { constants, BASEURL } from "../constants";

const RegisterUserForm = () => {
  // Create an initial state for the form data
  // Can be reused to reset form
  const INITIAL_STATE = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data validation
    
    try {
      // Post data to DB
      const data = await axios.post(`${BASEURL}/register`, form);
      console.log(data);
      // reset form
      setForm(INITIAL_STATE);
    } catch (err) {
      console.error(err.message)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        ></input>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export { RegisterUserForm };
