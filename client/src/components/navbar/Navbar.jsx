import { ArrowDropDown, LaptopWindows, Notifications, Search } from "@material-ui/icons"
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.scss";
import {setUserLogin} from '../../store/login/loginSlice';
import { removeToken } from "../../storage";
import { useNavigate } from 'react-router-dom';
// import CreateMovie from "./CreateMovie";
import { Button } from "@mui/material";
import { ButtonBase } from "@material-ui/core";
// import CreateUser from "./CreateUser";
// import CreateList from "./CreateList";




const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  window.onscroll = () =>{
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return() => (window.onscroll = null);
  }


  const logoutUser = () =>{
     dispatch(setUserLogin(false))

     removeToken();
     navigate('/login');

  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
          <div className="left">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                   alt=""
               />
               <Link to="/" className="link">
                <span>Homepage</span>
               </Link>
               
               <Link to="/series" className="link">
                <span>Series</span>
               </Link>
               {/* <Link to="/movies" className="link">
                <span>Movies</span>
               </Link> */}
               <Link to="/movies-list" className="link">
                <span>Movie</span>
               </Link>
               <Link to="/list-List" className="link">
                <span>List</span>
               </Link>
               <Link to="/user-list" className="link">
                <span>User</span>
               </Link>

          </div>

     

          <div className="right">
            <Search className="icon"/>
            {/* <span>KID</span> */}
            {/* <Notifications/> */}
            <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" 
            />
            <div className="profile">
              <ArrowDropDown className="icon"/>
              <div className="options">
                <span>Settings</span>
                <span onClick={logoutUser} >Logout</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
