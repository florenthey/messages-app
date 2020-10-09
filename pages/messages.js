import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ListMessages from "../components/ListMessages";
import SendMessage from "../components/SendMessage";

import { MessageContext } from "../context/messageContext";

const Title = styled.h1`
  font-size: 9vw;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function messages() {
  const { messages, messagesPrivate } = useContext(MessageContext);
  return (
    <div>
      <Title>Messages</Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 70%",
          gap: "10px",
          margin: "20px",
        }}
      >
        <ListMessages isPrivate={true} messages={messagesPrivate} />
        <ListMessages isPrivate={false} messages={messages} />
        <SendMessage />
      </div>
    </div>
  );
}
