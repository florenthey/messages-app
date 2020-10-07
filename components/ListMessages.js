import React from "react";
import Message from "../components/Message";

export default function ListMessages({ messages }) {
  return (
    <div>
      <h2>Liste de messages</h2>
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}
