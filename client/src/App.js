import React from "react";
import Navbar from "./components/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <div>
      <Navbar />      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>


    </div>
  );
};

export default App;
