import React from "react";
import Navbar from "./components/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import useToken from "./components/UseToken";
// import Header from "./components/Header";

const App = () => {
  const { token, removeToken, setToken } = useToken();

  return (
    <div>
      <Navbar removeToken={removeToken} token={token} />
      <Routes>
        {!token && token !== "" && token !== undefined ? (
          <Route path="/login" element={<Login setToken={setToken} />} />
        ) : (
          <Route path="/welcome" element={<Welcome />} />
        )}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
