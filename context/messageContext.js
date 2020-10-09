import { createContext, useEffect, useState } from "react";

import Axios from "axios";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [messagesPrivate, setMessagesPrivate] = useState([]);
  const [errors, setErrors] = useState("");

  const filterMessage = (messagesParams) => {
    const idUserLBC = localStorage.getItem("idUserLBC")
      ? localStorage.getItem("idUserLBC")
      : "";

    const messagePrivateFilter = messagesParams.filter(
      (e) => e.isPrivate === true && e.author._id === idUserLBC
    );

    const messageSimpleFilter = messagesParams.filter(
      (e) => e.isPrivate === false
    );

    return {
      messagePrivateFilter,
      messageSimpleFilter,
    };
  };

  useEffect(() => {
    const idUserLBC = localStorage.getItem("idUserLBC")
      ? localStorage.getItem("idUserLBC")
      : "";

    Axios.get("http://localhost:3000/api/messages")
      .then((res) => {
        const { messageSimpleFilter, messagePrivateFilter } = filterMessage(
          res.data
        );

        setMessages(messageSimpleFilter);
        setMessagesPrivate(messagePrivateFilter);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }, []);

  const messageToPublish = async (_id) => {
    try {
      await Axios.put("http://localhost:3000/api/message", {
        _id,
        isPrivate: false,
      });

      const updatedMessages = await Axios.get(
        "http://localhost:3000/api/messages"
      );

      const { messageSimpleFilter, messagePrivateFilter } = filterMessage(
        updatedMessages.data
      );

      setMessages(messageSimpleFilter);
      setMessagesPrivate(messagePrivateFilter);
      setErrors("");
    } catch (error) {
      setErrors(error);
    }
  };

  const publishMessage = async (values) => {
    try {
      await Axios.post("http://localhost:3000/api/message", {
        author: localStorage.getItem("idUserLBC"), // Default
        text: values.message,
        isPrivate: values.private, // Default
      });

      const updatedMessages = await Axios.get(
        "http://localhost:3000/api/messages"
      );

      const { messageSimpleFilter, messagePrivateFilter } = filterMessage(
        updatedMessages.data
      );

      setMessages(messageSimpleFilter);
      setMessagesPrivate(messagePrivateFilter);
      setErrors("");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <MessageContext.Provider
      value={{ messages, messagesPrivate, publishMessage, messageToPublish }}
    >
      {children}
    </MessageContext.Provider>
  );
};
