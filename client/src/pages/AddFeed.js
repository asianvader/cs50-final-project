import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { useForm } from "react-hook-form";
import DateTimePicker from "../components/DateTimePicker";
import { BASEURL } from "../constants";

function AddFeed(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state.id;
  const username = location.state.username;
  const babyName = location.state.babyName;
  let date;
  const [message, setMessage] = useState();

  // Dependencies for form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submittedFormData = (data) => {
    console.log(data);
    const feedDetails = {
      information: data.volume,
      id: userID,
      activity: "feed",
      date: date,
      name: babyName,
    };
    axios
      .post(`${BASEURL}/add-feed`, feedDetails, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((response) => {
        console.log(response);
        const getMsg = response.data.message;
        // render success message
        setMessage(getMsg);
        // remove message after 5 seconds
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
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
    date = dayjs(data).toISOString();
  };

  return (
    <div>
      <h2>Add feed for {babyName}</h2>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit((data) => {
          submittedFormData(data);
        })}
      >
        <div>
          <input
            id="volume"
            {...register("volume", {
              required: "This is required",
              maxLength: 4,
              pattern: /^[0-9]*$/,
            })}
          />
          <label htmlFor="volume"> ml</label>
          {errors.volume && errors.volume.type === "required" && (
            <p>This is required</p>
          )}
          {errors.volume && errors.volume.type === "maxLength" && (
            <p>Max length exceeded</p>
          )}
          {errors.volume && errors.volume.type === "pattern" && (
            <p>Numbers only </p>
          )}
        </div>
        <div>
          <label htmlFor="dob">Enter date and time:</label>
          <br />
          <DateTimePicker dateVal={getDateVal} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddFeed;
