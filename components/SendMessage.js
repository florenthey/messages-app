import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";

export default function SendMessage() {
  const [errors, setErrors] = useState("");

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    // validationSchema: YupRegister,

    onSubmit: async (values) => {
      try {
        console.log(values);
        await axios.post("http://localhost:3000/api/message", {
          author: "5f7dec2a881b4b1552dfd621", // Default
          text: values.message,
          isPrivate: false, // Default
        });
        setErrors("");
      } catch (error) {
        console.log({ error });
        setErrors(error.response.data);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="message"
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          type="text"
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}