import styled from "styled-components";
import YupRegister from "../yup/register";
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import storageAvailable from "../utils/checkLocalStorage";

const Title = styled.h1`
  font-size: 50px;
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
        console.log(values);
        await axios.post("http://localhost:3000/api/user", values);
        setErrors("");
        if (!storageAvailable("localStorage")) {
          alert(
            "Votre navigateur web ne prend pas en compte la propriété localeStorage. Vous ne pourrez pas utiliser toutes les fonctionnalités de notre site."
          );
        } else {
          localStorage.nicknameLBC = values.username;
          router.push("/messages");
        }
      } catch (error) {
        console.log({ error });
        setErrors(error.response.data);
      }
    },
  });

  return (
    <div>
      <Title>Message app</Title>
      <h1>Username</h1>
      {errors}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>

        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}
