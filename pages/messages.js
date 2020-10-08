import React, { useState, useEffect } from "react";
import ListMessages from "../components/ListMessages";
import axios from "axios";
import SendMessage from "../components/SendMessage";

export default function messages() {
  const [messages, setMessages] = useState([]);
  const [messagesPrivate, setMessagesPrivate] = useState([]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    const idUserLBC = localStorage.getItem("idUserLBC")
      ? localStorage.getItem("idUserLBC")
      : "";

    axios
      .get("http://localhost:3000/api/messages")
      .then((res) => {
        console.log(res);

        const messagePrivateFilter = res.data.filter(
          (e) => e.isPrivate === true && e.author._id === idUserLBC
        );

        const messageSimpleFilter = res.data.filter(
          (e) => e.isPrivate === false
        );

        setMessages(messageSimpleFilter);
        setMessagesPrivate(messagePrivateFilter);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }, []);
  return (
    <div>
      <h1>La page messages</h1>
      <ListMessages messages={messages} />
      <ListMessages messages={messagesPrivate} />
      <SendMessage />
    </div>
  );
}
