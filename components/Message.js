import React, { useContext, useState } from "react";
import axios from "axios";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { MessageContext } from "../context/messageContext";

export default function Message({ text, author, isUser, isPrivate, _id }) {
  const { messageToPublish } = useContext(MessageContext);

  const [errors, setErrors] = useState("");

  // refacto in styled-components
  return (
    <div
      style={{
        backgroundColor:
          isUser && isPrivate
            ? "#6f6dd6"
            : isUser
            ? "rgba(111, 109, 214, 0.5)"
            : "#fff",
        color: isUser ? "white" : "black",
        borderRadius: "10px",
        padding: "10px",
        border: "1px solid rgba(0,0,0,0.3)",
      }}
    >
      <strong>{author.username}</strong>
      <p>{text}</p>
      {isPrivate && (
        <button
          style={{ backgroundColor: "#f3d362", width: "70%" }}
          onClick={() => messageToPublish(_id)}
        >
          Publish
        </button>
      )}
    </div>
  );
}
