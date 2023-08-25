import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";
import "../styles/Register.css";

const Register = () => {
  const initialState = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword } = userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(()=>{
    if(auth.token) {
      navigate('/')
    }
  }, [auth.token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(userData));
  };
  return (
    <div className="register">
      <h3 className="register-header">Social Network</h3>
      <div className="register-container">
        <h6 className="register-surheader">REGISTER</h6>
        <div className="register-data">
          <form className="register-dataform" onSubmit={handleSubmit}>
            <input
              className="register-dataform-email"
              type="text"
              value={fullname}
              name="fullname"
              onChange={handleChange}
              placeholder={
                alert.fullname ? `${alert.fullname}` : "Enter your fullname"
              }
              style={{ background: `${alert.fullname ? "#fa8e96" : " "}` }}
            />

            <input
              className="register-dataform-email"
              type="text"
              name="username"
              placeholder={
                alert.username ? `${alert.username}` : "Enter your username"
              }
              value={username.toLowerCase().replace(/ /g, "")}
              onChange={handleChange}
              style={{ background: `${alert.fullname ? "#fa8e96" : " "}` }}
            ></input>
            <input
              className="register-dataform-email"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder={alert.email ? `${alert.email}` : 'Enter your Email'}
              style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}            />
            <input
              className="register-dataform-pass"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder={alert.password ? `${alert.password}` : 'Enter your Password'}
              style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}            />
            <input
              className="register-dataform-pass"
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Enter your password again'}
              style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}            />
            <button className="register-dataform-btn" type="submit">
              Sign up
            </button>
            <small>
              Already have an account? Login <Link to="/register">Here</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
