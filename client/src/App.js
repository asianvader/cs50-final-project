import React from "react";
import Navbar from "./components/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <Navbar />      
      <h1>Welcome to baby tracker</h1>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>


    </div>
  );
};

export default App;
