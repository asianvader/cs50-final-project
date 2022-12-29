import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddBaby = (props) => {
  const location = useLocation();
  const userID = location.state.id;
  console.log(userID);

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
    // TODO
  };
  // Reset input fields if forms has been submitted
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  return (
    <div>
      <h2>Add baby's details</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          submittedFormData(data);
        })}
      >
        {/* {message && <p>{message}</p>} */}
        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name", { required: "This is required" })} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="dob">Date of birth</label>
          <input {...register("dob", { required: "This is required" })} />
          <p>{errors.dob?.message}</p>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBaby;
