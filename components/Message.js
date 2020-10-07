import React from "react";

export default function Message({ text, author }) {
  return (
    <div>
      <hr />
      <div>User:{author.username}</div>
      <p>Texte:{text}</p>
      <hr />
    </div>
  );
}
