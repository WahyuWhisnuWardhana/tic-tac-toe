import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";

export default function RegisterHandler({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(`https://server.whisnu29.tech/register`, addedData);
      Swal.fire({
        title: `Added User with email ${email}`,
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      console.log(error, "<<<< REGISTER");
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
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
      <Register
        handleLogin={handleLogin}
        emailOnChange={emailOnChange}
        passwordOnChange={passwordOnChange}
      />
    </>
  );
}
