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
          const initialValue = new Array(result.data.length).fill(false);
          setViewFullMessage(initialValue);
          console.log(result.data);
          const resultData = result.data;
          resultData.reverse();
          setMessages(resultData);
          localStorage.setItem("messages", JSON.stringify(resultData));
          // var data = JSON.stringify(result.data[40].message);
          // var data1 = console.log(JSON.parse(data));
          // console.log(data1.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const viewFullMessageHandler = (index) => {
    console.log(messages[index].read);
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
              placeholder="Search by priority or category"
            />
          </div>
          <div className="messages">
            {messages
              .filter(
                (ele) =>
                  ele.priority.includes(search) ||
                  ele.message.event.includes(search)
              )
              .map((element, index) => {
                return (
                  <div
                    className="message"
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
