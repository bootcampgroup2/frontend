import React, { useEffect, useState } from "react";
// You can create an App.css file for general styling
import ProductGrid from "./ProductGrid";
import "../styling/ProductGrid.css";
import shirt from "../images/shirt.jpg";
import bag from "../images/bag.jpg";
import earbuds from "../images/earbuds.jpg";
import fastract from "../images/fastrack.jpg";
import iphone from "../images/iphone.jpg";
import laptop from "../images/laptop.jpg";
import tv from "../images/tv.jpg";
import pant from "../images/pant.jpg";
import refrigerator from "../images/refrigerator.jpg";
import studychair from "../images/studychair.jpg";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const token = localStorage.getItem("token");
  // Sample array of products (you can replace this with your data)
  const products = [
    {
      name: "Shirt",
      price: "20",
      image: shirt,
    },
    {
      name: "Bag",
      price: "10",
      image: bag,
    },
    {
      name: "Ear Buds",
      price: "40",
      image: earbuds,
    },
    {
      name: "Watch",
      price: "35",
      image: fastract,
    },
    {
      name: "Iphone",
      price: "1500",
      image: iphone,
    },
    {
      name: "Laptop",
      price: "1400",
      image: laptop,
    },
    {
      name: "Pant",
      price: "30",
      image: pant,
    },
    {
      name: "Study/Office chair",
      price: "20",
      image: studychair,
    },
    {
      name: "TV",
      price: "400",
      image: tv,
    },
    {
      name: "Refrigerator",
      price: "300",
      image: refrigerator,
    },
    // Add more products as needed
  ];

  const placeOrder = (item) => {
    const config = {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:8080/orders/placeorder", item, config)
      .then((result, err) => {
        alert(result.data);
        navigator("/inbox");
      });
  };
  return (
    <div>
      {loggedIn ? (
        <div className="App">
          <Navbar />
          <h1 style={{ textAlign: "center " }}>Available Products</h1>
          <div className="product-grid">
            {products.map((element, index) => {
              return (
                <ProductGrid product={element} order={placeOrder} key={index} />
              );
            })}
          </div>
        </div>
      ) : (
        " You need to login first"
      )}
    </div>
  );
};

export default Products;
