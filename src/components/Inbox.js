import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styling/Inbox.css";
import Navbar from "./Navbar";
import { json } from "react-router-dom";
import FullMessage from "./FullMessage";
function Inbox() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const [read, setRead] = useState([]);
  const [viewFullMessage, setViewFullMessage] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      axios
        .get("http://localhost:8080/email/messages", {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
          data: {},
        })
        .then((result, err) => {
          //setMessages(result.data);
          // for (let r of result.data) {
          //   console.log(r);
          // }
          console.log(result.data);
          const len = result.data.length;
          const initialValueOfViewFullMessages = new Array(len).fill(false);
          const initialValueOfRead = new Array(len).fill("Unread");
          setRead(initialValueOfRead);
          setViewFullMessage(initialValueOfViewFullMessages);
          const resultData = result.data;
          resultData.reverse();
          setMessages(resultData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  const viewFullMessageHandler = (index) => {
    if (messages[index].read == false) {
      const config = {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      };
      const id = messages[index].id;
      axios
        .put("http://localhost:8080/email/updatetoread/" + id, {}, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (read[index] == "Unread") {
      const changedRead = [...read];
      changedRead[index] = "read";
      setRead(changedRead);
    }

    const changeViewFullMessage = [...viewFullMessage];
    changeViewFullMessage[index] = !changeViewFullMessage[index];

    setViewFullMessage(changeViewFullMessage);
  };
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
              placeholder="Search by priority, category, order"
            />
          </div>
          <div className="messages">
            {messages
              .filter((ele) =>
                ele.message.event == "Order"
                  ? ele.message.itemName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    ele.priority.toLowerCase().includes(search.toLowerCase()) ||
                    ele.message.event
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : ele.priority.toLowerCase().includes(search.toLowerCase()) ||
                    ele.message.event
                      .toLowerCase()
                      .includes(search.toLowerCase())
              )
              .map((element, index) => {
                return (
                  <div
                    className={
                      element.read || read[index] == "read"
                        ? "message"
                        : "highlight"
                    }
                    key={index}
                    onClick={() => viewFullMessageHandler(index)}
                  >
                    {viewFullMessage[index] ? (
                      <FullMessage data={element} />
                    ) : (
                      <div>
                        <p style={{ textAlign: "left" }}>
                          <b>
                            From :{element.message.from.substring(20, 33)},{" "}
                          </b>
                          {element.message.from.substring(0, 19)}
                        </p>
                        <span>
                          Regarding{" "}
                          <b>
                            {element.message.itemName} {element.message.event}
                          </b>
                        </span>
                        <span>
                          a mail is sent to : <b>{element.message.email}</b>
                        </span>
                        <p>Click here to see the mail content...</p>
                        <p style={{ textAlign: "right" }}>
                          <span
                            style={{
                              marginRight: "5px",
                              fontWeight: "bold",
                            }}
                          >
                            {element.read == true || read[index] == "read"
                              ? "Read"
                              : "Unread"}
                          </span>
                          {element.message.dateAndTime.substring(0, 10)},
                          {element.message.dateAndTime.substring(10, 19)}
                        </p>
                      </div>
                    )}
                  </div>
                );
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
