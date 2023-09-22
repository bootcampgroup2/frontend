// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
import NotificationIcon from "../images/notification.png";
// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light">
//       <div className="container">
//         {/* Logo on the left end */}
//         <a className="navbar-brand" href="/">
//           <img
//             src={NotificationIcon}
//             alt="Logo"
//             width="50"
//             height="50"
//             className="d-inline-block align-top"
//           />
//         </a>

//         {/* Centered items */}
//         <ul className="navbar-nav mx-auto">
//           <li className="nav-item">
//             <a className="nav-link" href="/">
//               Products
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/">
//               Inbox
//             </a>
//           </li>
//         </ul>

//         {/* Notification icon and toggle button on the right */}
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <a className="nav-link" href="/">
//               <i className="fa fa-bell"></i> {/* Notification icon */}
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/">
//               <i className="fa fa-toggle-on"></i> {/* Toggle button */}
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "../styling/Navbar.css";
import "font-awesome/css/font-awesome.min.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  const handleToggle = () => {
    setToggle(!toggle);
    const config = {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    };
    axios
      .put("http://localhost:8080/user/updateuser", {}, config)
      .then((result) => {
        toggle
          ? alert("You won't receive notifications")
          : alert("You will receive notifications");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const removeAccount = () => {
    axios
      .delete("http://localhost:8080/user/deleteuser", {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
        data: {},
      })
      .then((result) => {
        navigate("/register");
        alert(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={NotificationIcon} alt="Logo" className="logo" />
        <h2 className="logotext">e-MAIL NOTIFY</h2>
      </div>
      {/* <div className="navbar-center"></div> */}
      <div className="navbar-right">
        <a href="/products" className="nav-item">
          Products
        </a>
        <a href="/inbox" className="nav-item">
          Inbox
        </a>
        {/* <div className="notification-icon">
          <i className="fa fa-bell"></i>
        </div> */}
        <div className="toggle-button">
          On/Off
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} checked={toggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="toggle-button logout">
          Logout
          <button onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
        <button className="btn btn-danger" onClick={removeAccount}>
          Remove Account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
