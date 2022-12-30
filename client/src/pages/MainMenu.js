import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASEURL } from "../constants";
import axios from "axios";

const MainMenu = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username;
  const [userDetails, setUserDetails] = useState({
    username: username,
    id: null,
    children: false,
  });
  const [children, setChildren] = useState();

  useEffect(() => {
    axios
      .post(
        `${BASEURL}/main-menu`,
        { username: username },
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      )
      .then((response) => {
        // If there are children in the db
        if (response.data.length !== undefined) {
          const id = response.data[0].id;
          setChildren(response.data);
          setUserDetails({
            ...userDetails,
            id: id,
            children: true,
          });
        } else {
          const id = response.data.id;
          setUserDetails({
            ...userDetails,
            id: id,
            children: false,
          });
        }
        console.log(response);
        console.log(response.data.length);
      });
  }, []);
  console.log("userDetails", userDetails);
  console.log("children", children);
  const options = {
    add: "Add baby",
    feed: "Log feed",
    sleep: "Log sleep",
    nappy: "Nappy Change",
    weight: "Log weight",
  };

  function addBaby() {
    navigate("/add-baby", { state: { id: userDetails.id, username: username } });
  }

  function addFeed() {}

  function addSleep() {}

  function addNappy() {}

  function addWeight() {}

  return (
    <div>
      <h1>Welcome back {location.state.username}</h1>

      {userDetails.children && (
        <>
          <button onClick={addFeed}>{options.feed}</button>
          <button onClick={addSleep}>{options.sleep}</button>
          <button onClick={addNappy}>{options.nappy}</button>
          <button onClick={addWeight}>{options.weight}</button>
        </>
      )}

      <button onClick={addBaby}>{options.add}</button>
    </div>
  );
};

export default MainMenu;