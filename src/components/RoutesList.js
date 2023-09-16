import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function RoutesList() {
  return (
    <Router>
      <Routes>
        <Route path="" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Routes>
    </Router>
  );
}

export default RoutesList;
