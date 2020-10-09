import { createGlobalStyle, ThemeProvider } from "styled-components";
import { MessageProvider } from "../context/messageContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #ebeef2;
    font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }

  button {
    display: inline-block;
    padding: 10px 15px;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #ffbcdf;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px #999;
  }

  // button:hover {background-color: #d190b2}

  button:active {
  background-color: #d190b2;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`;

const theme = {
  colors: {
    primary: "#6f6dd6",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <MessageProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MessageProvider>
    </>
  );
}
