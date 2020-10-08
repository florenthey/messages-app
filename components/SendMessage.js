import axios from "axios";
import { useFormik, Field } from "formik";
import React, { useState } from "react";

export default function SendMessage() {
  const [errors, setErrors] = useState("");

  const formik = useFormik({
    initialValues: {
      message: "",
      private: false,
    },
    // validationSchema: YupRegister,

    onSubmit: async (values) => {
      try {
        console.log(values);
        await axios.post("http://localhost:3000/api/message", {
          author: localStorage.getItem("idUserLBC"), // Default
          text: values.message,
          isPrivate: values.private, // Default
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
        <input
          onChange={formik.handleChange}
          type="checkbox"
          id="private"
          name="private"
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
