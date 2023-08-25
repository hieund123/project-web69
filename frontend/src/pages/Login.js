import React , {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import "../styles/Login.css";
import {login} from '../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
  const initialState = {email: '', password: ''}
 const navigate = useNavigate();
 const {auth} = useSelector(state => state)
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(auth.token){
      navigate('/')
    }
  })
const {email, password} = userData;
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData , [name]:value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
   
    dispatch(login(userData));
  }

  return (
    <div className="login">
      <h3 className="login-header">Social Network</h3>
      <div className="login-container">
        <h6 className="login-surheader">LOGIN</h6>
        <div className="login-data">
          <form className="login-dataform" onSubmit={handleSubmit}>
            <input
              className="login-dataform-email"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="Type your email"
            ></input>
            <input
              className="login-dataform-pass"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="Type your password"
            ></input>
            <button className="login-dataform-btn" type="submit">
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