import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Video from "../assets/video.mp4";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create Account</button>
          <span>
            HAVE AN EXISTING ACCOUNT ? <Link to="/login">Login.</Link>
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
  ${'' /* background-color: #0a0000; */}
  ${'' /* background-image: url(""); */}
 
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
  ${'' /* button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  } */}

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

  ${'' /* video {
    position: absolute;
    
    width: 100px;
    height: 100px;
  
  } */}
  ${'' /* .video-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;

  } */}
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
