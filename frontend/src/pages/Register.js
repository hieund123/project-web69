import React, { useState } from "react";
import '../styles/Register.css';
import {Link} from 'react-router-dom'

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="register">
      <h3 className="register-header">Social Network</h3>
      <div className="register-container">
        <h6 className="register-surheader">REGISTER</h6>
        <div className="register-data">
          <form className="register-dataform">
            <input
              className="register-datafrom-email"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.fullname)}
              placeholder="Type your full name"
            ></input>
            <input
              className="register-datafrom-email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.username)}
              placeholder="Type your username"
            ></input>
            <input
              className="register-datafrom-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.email)}
              placeholder="Type your email"
            ></input>
            <input
              className="register-datafrom-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.password)}
              placeholder="Type your password"
            ></input>
            <input
              className="register-datafrom-pass"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.confirmPassword)}
              placeholder="Confirm your password"
            ></input>
            <button className="register-datafrom-btn" type="submit">
              Sign up
            </button>
            <small>Already have an account? Login <Link to="/register">Here</Link></small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
