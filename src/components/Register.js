import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../styling/Register.css";
import emailImage from "../email.jpg";
import notificationImage from "../notification.png";
import { FaUser, FaLock, FaEnvelope, FaCalendar } from "react-icons/fa";
function RegistrationForm() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    email: "",
    dob: "",
  });

  function validateAge(currentDate, birthdate) {
    // Calculate the age difference in milliseconds
    const ageDifference = currentDate - birthdate;

    // Convert age difference to years
    const ageInYears = ageDifference / (1000 * 60 * 60 * 24 * 365.25);

    // Check if the age is at least 18
    if (ageInYears >= 18) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation rules can be added here
    let error = "";

    if (name === "userName") {
      error =
        value.length < 5 ? "userName must be at least 5 characters long" : "";
    } else if (name === "password") {
      error =
        value.length < 8 ? "Password must be at least 8 characters long" : "";
    } else if (name === "email") {
      error = !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        ? "Email is not valid"
        : "";
    } else if (name === "dob") {
      let currDate = new Date();
      let selectedDate = new Date(value);
      if (validateAge(currDate, selectedDate)) {
        error = "";
      } else {
        error = "please select a date in past";
      }
    }

    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
    console.log(errors);
  };

  const formValidate = () => {
    if (
      errors.userName == "" &&
      errors.password == "" &&
      errors.email == "" &&
      errors.dob == ""
    ) {
      console.log(errors);
      return true;
    }
    console.log(errors);
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    let currdate = new Date();
    let givendate = new Date(formData.dob);
    console.log(currdate, " ", givendate);
    if (formValidate()) {
      axios
        .post("http://localhost:8080/adduser", formData)
        .then((result) => {
          window.location = "/";
        })
        .catch((err) => {
          console.log(err);
          let error = err.response.data;
          //const error = err.response.data;
          setErrors({ ...errors, ["email"]: error });
        });
    }
  };

  return (
    <div className="parent">
      <div className="child firstbox">
        <img
          className="logo"
          src={notificationImage}
          alt="There is a notification image"
        ></img>
        <h2 className="logotext">e-MAIL NOTIFY</h2>
        <h4 className="desc">
          It allows you to quickly know the status of emails
        </h4>
        <img
          className="emailimage"
          src={emailImage}
          alt="There is an image"
        ></img>
      </div>
      <div className="container mt-5 child box">
        <h3 className="signup">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              <FaUser />
              <span>userName</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.userName ? "is-invalid" : ""}`}
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            {errors.userName && (
              <div className="invalid-feedback">{errors.userName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <FaLock />
              <span>Password</span>
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <FaEnvelope />
              <span>Email</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              <FaCalendar />
              <span>DOB</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            Already have an account?
            <a className="link" href="/">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
