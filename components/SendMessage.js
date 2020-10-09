import axios from "axios";
import { useFormik, Field } from "formik";
import React, { useContext, useState } from "react";
import { MessageContext } from "../context/messageContext";

export default function SendMessage() {
  const [errors, setErrors] = useState("");
  const { sendMessage } = useContext(MessageContext);

  const formik = useFormik({
    initialValues: {
      message: "",
      private: false,
    },
    // validationSchema: YupRegister,

    onSubmit: (values, { resetForm }) => {
      sendMessage(values);
      resetForm({ values: "" });
    },
  });

  return (
    <form
      style={{
        gridColumn: "1 / span 2",
        display: "grid",
        gridTemplateColumns: "auto 40px 100px",
        placeItems: "center",
      }}
      onSubmit={formik.handleSubmit}
    >
      <input
        id="message"
        name="message"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        type="text"
        style={{ width: "100%", margin: "5px" }}
        placeholder="My message"
      />

      <input
        onChange={formik.handleChange}
        type="checkbox"
        id="private"
        name="private"
        checked={formik.values.private}
      />
      <label for="private">is private</label>

      <button type="submit">Send</button>
    </form>
  );
}
