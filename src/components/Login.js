import React, { useState } from "react";
import "../styling/Register.css";
import notificationImage from "../notification.png";
import emailImage from "../email.jpg";
import { FaUser, FaLock } from "react-icons/fa";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation
    let newErrors = { ...errors };
    switch (name) {
      case "username":
        newErrors.username =
          value.length < 5 ? "Username must be at least 5 characters long" : "";
        break;
      case "password":
        newErrors.password =
          value.length < 8 ? "Password must be at least 8 characters long" : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors
    if (errors.username || errors.password) {
      alert("Please fix the form errors before submitting.");
      return;
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
              <FaUser />
              <span>Username</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
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
          <div class="text-center">
            <button type="submit" class="btn btn-primary">
              Sign In
            </button>
          </div>
          <div class="text-center">
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