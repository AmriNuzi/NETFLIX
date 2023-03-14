import React from 'react';
import "./login.scss";
import axios from 'axios';
import {setToken} from '../../storage/index'
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/login/loginSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const [email, setEmail] = React.useState("amri@gmail.com");
  const [pass, setPass] = React.useState("123456"); 

  const onChangeEmail = (e) => setEmail(e.target.value)
  const onChangePassword = (e) => setPass(e.target.value)


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {  
      const loginUser = await axios({
        method: 'Post',
        url:'http://localhost:8800/api/auth/login',
        headers:{},
        data:{
          email: email, 
          password: pass
        }
      });
      setToken(loginUser.data.accessToken);
      dispatch(setUserLogin(loginUser.status === 200 ? true : false))
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />    
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input value={email} onChange={onChangeEmail} type="email" placeholder="Email or phone number"/>
          <input value={pass} onChange={onChangePassword} type="password" placeholder="password"/>
          <button onClick={handleSubmit} className="loginButton">Sign In</button>
          <span>New to Netflix? <b>Sign up now.</b></span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
