import React from "react";
import Message from "../components/Message";

export default function ListMessages({ messages, isPrivate }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        alignContent: "flex-start",
        backgroundColor: "whitesmoke",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      {isPrivate ? <h2>My private messages</h2> : <h2>User's messages</h2>}
      {messages.map((message, index) => (
        <Message
          isPrivate={isPrivate}
          key={index}
          {...message}
          isUser={localStorage.getItem("idUserLBC") === message.author._id}
        />
      ))}
    </div>
  );
}
