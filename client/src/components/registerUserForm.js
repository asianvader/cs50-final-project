import React, { useState } from "react";

const RegisterUserForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(form.username + " " + form.password);
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
