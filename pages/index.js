import styled from "styled-components";
import YupRegister from "../yup/register";
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import storageAvailable from "../utils/checkLocalStorage";

const Title = styled.h1`
  font-size: 9vw;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  const router = useRouter();
  const [errors, setErrors] = useState("");

  // If user already identified, redirect to message page
  useEffect(() => {
    const name = localStorage.getItem("nicknameLBC")
      ? localStorage.getItem("nicknameLBC")
      : "";
    if (name) router.push("/messages");
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: YupRegister,

    // Post new user in database and localStorage
    onSubmit: async (values) => {
      try {
        const user = await axios.post("http://localhost:3000/api/user", values);
        setErrors("");
        if (!storageAvailable("localStorage")) {
          alert(
            "Votre navigateur web ne prend pas en compte la propriété localeStorage. Vous ne pourrez pas utiliser toutes les fonctionnalités de notre site."
          );
        } else {
          localStorage.idUserLBC = user.data._id;
          localStorage.nicknameLBC = values.username;
          router.push("/messages");
        }
      } catch (error) {
        setErrors(error.response.data);
      }
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Title>Messages App</Title>
      <div
        style={{
          backgroundColor: "#6f6dd6",
          color: "whitesmoke",
          margin: "50px",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <h1 style={{ fontSize: "5vw" }}>Hello, choose your username</h1>
        {errors}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={formik.handleSubmit}
        >
          {/* <label htmlFor="username">Username</label> */}

          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder="My username"
            style={{
              borderRadius: "5px",
              padding: "4px",
              width: "70%",
              margin: "10px",
            }}
          />
          {formik.touched.username && formik.errors.username ? (
            <div style={{ color: "#f3d362" }}>{formik.errors.username}</div>
          ) : null}

          <button style={{ margin: "10px" }} type="submit">
            Connection
          </button>
        </form>
      </div>
    </div>
  );
}
