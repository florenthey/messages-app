import Axios from "axios";
import React, { useState, useEffect } from "react";
import ListMessages from "../components/ListMessages";
import axios from "axios";
import SendMessage from "../components/SendMessage";

export default function messages() {
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/messages")
      .then((res) => {
        console.log(res);
        setMessages(res.data);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }, []);
  return (
    <div>
      <h1>La page messages</h1>
      <ListMessages messages={messages} />
      <SendMessage />
    </div>
  );
}
