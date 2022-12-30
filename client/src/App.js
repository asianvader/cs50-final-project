import React from "react";
import Navbar from "./components/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu";
import useToken from "./components/UseToken";
import AddBaby from "./pages/AddBaby";
import AddFeed from "./pages/AddFeed";
import ActivityHistory from "./pages/ActivityHistory";

const App = () => {
  const { token, removeToken, setToken } = useToken();

  return (
    <div>
      <Navbar removeToken={removeToken} token={token} />
      <Routes>
        {!token && token !== "" && token !== undefined ? (
          <Route path="/login" element={<Login setToken={setToken} />} />
        ) : (
          <Route path="/main-menu" element={<MainMenu token={token} />} />
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/add-baby" element={<AddBaby token={token}/>}/>
        <Route path="/add-feed" element={<AddFeed token={token}/>}/>
        <Route path="/activity-history" element={<ActivityHistory token={token}/>}/>

      </Routes>
    </div>
  );
};

export default App;
