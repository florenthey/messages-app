import React from "react";

export default function Message({ text, author, isUser }) {
  return (
    <div style={{ backgroundColor: isUser ? "red" : "green" }}>
      <hr />
      <div>User:{author.username}</div>
      <p>Texte:{text}</p>
      <hr />
    </div>
  );
}
