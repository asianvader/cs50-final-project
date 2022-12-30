import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASEURL } from "../constants";
import axios from "axios";
import dayjs from "dayjs";

function ActivityHistory(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const data = {
    username: location.state.username,
    babyName: location.state.babyName,
    id: location.state.id,
  };

  const activities = ["Activity", "Feed", "Sleep", "Nappies", "Weight"];
  const [selectedOption, setSelectedOption] = useState("");

  const handleActivityChange = (event) => {
    const value = event.target.value;
    let activity = value.toLowerCase();
    setSelectedOption(activity);

    // Check db
    console.log("call db");
    if (event.target.value !== "Activity") {
      data["activity"] = activity;
      
      // Query db
      axios
        .get(
          `${BASEURL}/activity-history/${data.id}/${data.babyName}/${data.activity}`,
          {
            headers: {
              Authorization: "Bearer " + props.token,
            },
          }
        )
        .then((response) => {
          
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  console.log(selectedOption);

  return (
    <div>
      <h2>Activity History</h2>
      <form>
        <label>
          Choose an option:
          <select value={selectedOption} onChange={handleActivityChange}>
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
}

export default ActivityHistory;
