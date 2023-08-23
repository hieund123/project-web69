import React, { useState } from "react";
import "../styles/Login.css";
import {Link} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({email, password});

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setUserData({...userData, email, password});
  }

  return (
    <div className="login">
      <h3 className="login-header">Social Network</h3>
      <div className="login-container">
        <h6 className="login-surheader">LOGIN</h6>
        <div className="login-data">
          <form className="login-dataform" onSubmit={handleSubmit}>
            <input
              className="login-datafrom-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
            ></input>
            <input
              className="login-datafrom-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
            ></input>
            <button className="login-datafrom-btn" type="submit">
              Log In
            </button>
            <small>Do not have an account? Create <Link to="/register">Here</Link></small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
