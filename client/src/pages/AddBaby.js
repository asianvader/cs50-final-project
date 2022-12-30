import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "../components/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { BASEURL } from "../constants";

const AddBaby = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state.id;
  const username = location.state.username;
  let dob;
  const [message, setMessage] = useState();

  // Dependencies for form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submittedFormData = async (data) => {
    console.log(data);
    const babyDetails = {
      ...data,
      dob: dob,
      id: userID,
    };
    axios
      .post(`${BASEURL}/add-baby`, babyDetails, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((response) => {
        console.log(response);
        const getMsg = response.data.message;
        setMessage(getMsg);
        setTimeout(() => {
          navigate("/main-menu", { state: { username: username } });
        }, 2000);
      });
  };
  // Reset input fields if forms has been submitted
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  //  Get date selected from child component
  const getDateVal = (data) => {
    console.log("Date picker", dayjs(data).toISOString());
    // convert date to ISO 8601 string
    dob = dayjs(data).toISOString();
  };
  return (
    <>
      <h2>Add baby's details</h2>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit((data) => {
          submittedFormData(data);
        })}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name", { required: "This is required" })} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="dob">Date of birth</label>
          <DatePicker dateVal={getDateVal} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddBaby;
