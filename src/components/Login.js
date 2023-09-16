import React, { useState } from "react";
import "../styling/Register.css";
import notificationImage from "../notification.png";
import emailImage from "../email.jpg";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validatePassword(password) {
    // Define a regular expression pattern to match the criteria
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    // Use the test() method to check if the password matches the pattern
    return pattern.test(password);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        newErrors.email =
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
            ? "Email is not valid"
            : "";
        break;
      case "password":
        let error;
        if (validatePassword(value)) {
          error = "";
        } else {
          error =
            "Password should be minimum 8 character and contain atleast 1 uppercase,1 lowercase,1 digit, 1 special character";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors
    if (errors.email || errors.password) {
      alert("Please fix the form errors before submitting.");
      return;
    } else {
      axios
        .post("http://localhost:8001/login", formData)
        .then((result) => {
          document.cookie = `token = ${result.data}`;
          window.location = "/home";
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Perform login logic here
    // For example, you can send the formData to a server for authentication
    console.log("Login form submitted:", formData);
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
        <h3 className="signup">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <FaEnvelope />
              <span>Email</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.email}</div>
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
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <div className="text-center">
            Don't have an account ?
            <a className="link" href="/register">
              Create one
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
