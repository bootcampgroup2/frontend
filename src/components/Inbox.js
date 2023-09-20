import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styling/Inbox.css";
import Navbar from "./Navbar";
function Inbox() {
  const [messages, setMessages] = useState(["hello", "welcome", "everyone"]);
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  });
  //   useEffect(() => {
  //     axios
  //       .get("")
  //       .then((result, err) => {
  //         setMessages(result.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  return (
    <div>
      {loggedIn ? (
        <div>
          <Navbar />
          <div className="srch">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by priority or category"
            />
          </div>
          <div className="messages">
            {messages.map((element, index) => {
              return <div className="message">{element}</div>;
            })}
          </div>
        </div>
      ) : (
        " You need to login first"
      )}
    </div>
  );
}
export default Inbox;
