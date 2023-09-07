import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../styling/Register.css";
import emailImage from "../email.jpg";
import notificationImage from "../notification.png";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaAddressCard,
  FaMobile,
} from "react-icons/fa";
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation rules can be added here
    let error = "";
    if (name === "username") {
      error =
        value.length < 5 ? "Username must be at least 5 characters long" : "";
    } else if (name === "password") {
      error =
        value.length < 8 ? "Password must be at least 8 characters long" : "";
    } else if (name === "email") {
      error = !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        ? "Email is not valid"
        : "";
    } else if (name === "mobile") {
      error = !/^\d{10}$/.test(value) ? "Mobile number is not valid" : "";
    }

    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  const formValidate = () => {
    if (
      errors.username == "" &&
      errors.password == "" &&
      errors.email == "" &&
      errors.mobile == ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    if (formValidate()) {
      const data = {
        userName: formData.username,
        password: formData.password,
        email: formData.email,
        address: formData.address,
        mobile: formData.mobile,
      };
      axios
        .post("http://localhost:8080/adduser", data)
        .then((result) => {
          window.location = "/login";
        })
        .catch((err) => {
          const error = err.response.data;
          setErrors({ ...errors, ["username"]: error });
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
            <label htmlFor="address" className="form-label">
              <FaAddressCard />
              <span>Address</span>
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              <FaMobile />
              <span>Mobile</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile}</div>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            Already have an account?
            <a className="link" href="/login">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
