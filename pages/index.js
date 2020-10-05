import styled from "styled-components";
import YupRegister from "../yup/register";
import { useFormik } from "formik";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: YupRegister,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Title>Message app</Title>
      <h1>Username</h1>
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
