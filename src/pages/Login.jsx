import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Video from "../assets/video.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
    <video autoPlay muted loop id="Video">
      <source src={ Video} type="video/mp4" />
      </video>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>We-Text</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            NEW HERE ? <Link to="/register">Create Your Account</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0a0000;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
   display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    left: 460px;
   // background-color:#fcfcfc;
   background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(139,19,104,1) 100%);
    border-radius: 1rem;
    padding: 1rem 3rem;
  }
  input {
    background-color: black;
    padding: 0.4rem;
    border: 0.rem  ;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    position: relative;
    color:  black;
    background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(184,41,142,1) 100%);
    letter-spacing: 5px;
    border: 3px solid cyan;
    padding: 1rem 1rem;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    transition: 1.5s;
    border-radius:100px;
    &:hover {
      box-shadow: 0 5px 1px 0 cyan inset,0 2px 20px 0 cyan,
    0 1px 50px 0 cyan inset,0 1px 50px 0 cyan;
    text-shadow: 100 100 1px cyan;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #ff5e5e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
