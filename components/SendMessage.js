import axios from "axios";
import { useFormik, Field } from "formik";
import React, { useContext, useState } from "react";
import { MessageContext } from "../context/messageContext";

export default function SendMessage() {
  const [errors, setErrors] = useState("");
  const { publishMessage } = useContext(MessageContext);

  const formik = useFormik({
    initialValues: {
      message: "",
      private: false,
    },
    // validationSchema: YupRegister,

    onSubmit: (values, { resetForm }) => {
      publishMessage(values);
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
        style={{ width: "100%" }}
      />
      <input
        onChange={formik.handleChange}
        type="checkbox"
        id="private"
        name="private"
        checked={formik.values.private}
      />
      <button type="submit">Send</button>
    </form>
  );
}
