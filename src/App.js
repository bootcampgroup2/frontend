import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Home from "../src/components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
