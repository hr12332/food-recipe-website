import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const getItems = JSON.parse(localStorage.getItem("user"));
  // console.log("get",getItems);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (Email == "" || Password == "") {
      message.error("Email and Password are required.");
      return;
    }
    if (Email == getItems?.Email && Password == getItems.Password) {
      message.success("Login successfully");
      navigate("/homepage");
      return;
    } else {
      message.error("Invalid Email Or Password");
      return;
    }
  };
  return (
    <>
      <div className="container">
        <div className="login-container">
          <h1>Login</h1>
          <form>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="button-div">
              <button type="submit" onClick={HandleSubmit}>
                Login
              </button>
            </div>
            <div className="forget">
              <label htmlFor="password">
                Remember Me <a href="/forgot">Forget Password</a>
              </label>
            </div>
            <div className="register">
              <p>
                Don't have a account <a href="/signup">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
