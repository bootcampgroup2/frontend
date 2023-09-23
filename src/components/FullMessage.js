import React from "react";

export default function FullMessage(props) {
  console.log(props.data);
  return (
    <div>
      {/* <span>Regarding</span>
      <h3>{props.data.message.event}</h3>
      <span>A mail is sent to :</span> */}
      {/* <h6>{props.data.message.email}</h6> */}
      <p style={{ textAlign: "left" }}>
        <b>From :{props.data.message.from.substring(20, 33)}, </b>
        {props.data.message.from.substring(0, 19)}
      </p>
      {props.data.message.event == "Order" ? (
        <div>
          <div>
            <h1 style={{ color: "blue" }}>Order Placed</h1>
            <h6>"Your Order is placed successfully!!! Congrats"</h6>
            <p style={{ color: "red" }}>Please visit again</p>
            <h6 style={{ color: "red" }}>{props.data.message.message}</h6>
            <div
              style={{
                backgroundColor: "lightgreen",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              <h3>Order Details</h3>
              <p>Order Id : {props.data.message.orderId}</p>
              <p>Item : {props.data.message.itemName}</p>
              <p>Quantity : {props.data.message.quantity}</p>
              <p>Total Price : ${props.data.message.price}</p>
            </div>
          </div>
        </div>
      ) : props.data.message.event == "Registration" ? (
        <div style={{ backgroundColor: "lightgreen", display: "inline-block" }}>
          <h1 style={{ color: "blue" }}>Welcome to e-Mail Notify</h1>
          <h4>Thanks for signing up with e-Mail Notify</h4>
          <p>{props.data.message.message}</p>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "blue" }}>Promotion</h1>
          <h6>{props.data.message.message}</h6>
        </div>
      )}
      <p style={{ textAlign: "right" }}>
        {props.data.message.dateAndTime.substring(0, 10)},
        {props.data.message.dateAndTime.substring(10, 19)}
      </p>
    </div>
  );
}
