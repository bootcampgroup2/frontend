import React, { useState } from "react";
import "../styling/ProductGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
const ProductGrid = ({ product, order }) => {
  const [quantity, setQuantity] = useState(1);
  const submitHandler = (product) => {
    const orderDetails = {
      name: product.name,
      qty: Number(quantity),
      price: product.price,
    };
    order(orderDetails);
  };
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <input
        type="number"
        placeholder="enter quantity..."
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        key={product}
      ></input>
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
