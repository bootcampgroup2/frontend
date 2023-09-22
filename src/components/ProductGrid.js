import React, { useState } from "react";
import "../styling/ProductGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
const ProductGrid = ({ product, order }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const submitHandler = (product) => {
    const orderDetails = {
      name: product.name,
      qty: selectedNumber,
      price: Number(product.price) * selectedNumber,
    };
    order(orderDetails);
  };
  const handleChange = (e) => {
    setSelectedNumber(parseInt(e.target.value));
  };
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <select
        className="dropdown"
        value={selectedNumber}
        onChange={handleChange}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary"
        onClick={() => submitHandler(product)}
      >
        Order
      </button>
    </div>
  );
};

export default ProductGrid;
