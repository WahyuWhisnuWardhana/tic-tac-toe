import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

export default function LoginHandler({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(
        `https://server.whisnu29.tech/login`,
        addedData
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error, "<<<<LOGIN");
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(
        `https://server.whisnu29.tech/google-login`,
        null,
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <Login
        handleLogin={handleLogin}
        emailOnChange={emailOnChange}
        passwordOnChange={passwordOnChange}
        googleLogin={googleLogin}
      />
    </>
  );
}
