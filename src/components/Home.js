import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Define the Home component
function Home() {
  const [notifications, setNotifications] = useState([
    "New Notification from Jhon Doe",
    "New Notification from Ashish Tiwari",
  ]);

  const [products] = useState([
    {
      name: "Product 1",
      price: 49.99,
      rating: 4.5,
      image: "product.jpg",
    },
    {
      name: "Product 2",
      price: 39.99,
      rating: 4.0,
      image: "product.jpg",
    },
    {
      name: "Product 3",
      price: 59.99,
      rating: 4.8,
      image: "product.jpg",
    },
    {
      name: "Product 4",
      price: 69.99,
      rating: 4.2,
      image: "product.jpg",
    },
    {
      name: "Product 5",
      price: 69.99,
      rating: 4.2,
      image: "product.jpg",
    },
    {
      name: "Product 6",
      price: 69.99,
      rating: 4.2,
      image: "product.jpg",
    },
    {
      name: "Product 7",
      price: 69.99,
      rating: 4.2,
      image: "product.jpg",
    },
    {
      name: "Product 8",
      price: 69.99,
      rating: 4.2,
      image: "product.jpg",
    },
  ]);

  // Function to handle adding new notifications
  function addNewNotifications(newNotifications) {
    setNotifications([...notifications, ...newNotifications]);
  }

  // Function to handle notification clicks
  function handleNotificationClick(notification) {
    // Handle the click action (e.g., redirect, remove notification)
    alert("Clicked on notification: " + notification);

    // Remove the clicked notification from the list
    const updatedNotifications = notifications.filter(
      (item) => item !== notification
    );
    setNotifications(updatedNotifications);
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg">
        <a class="navbar-brand" href="#">
          <div class="logo-container">
            <img class="logo" src="notification.png" alt="e-MAIL NOTIFY Logo" />
            <h2 class="logotext">e-MAIL NOTIFY</h2>
          </div>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Product
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="shoppingcart.html">
                Shopping Cart
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="inbox.html">
                Inbox
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Notifications */}
      <div className="container mt-4">
        <div className="dropdown">
          <a
            href="#"
            className="navbar-text dropdown-toggle"
            id="notificationDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bell"></i>
            <span className="badge badge-danger">{notifications.length}</span>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="notificationDropdown"
          >
            {notifications.map((notification, index) => (
              <a
                key={index}
                href="#"
                className="dropdown-item"
                onClick={() => handleNotificationClick(notification)}
              >
                {notification}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mt-4">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <p className="card-text">Rating: {product.rating}/5</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
