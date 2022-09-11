import * as React from "react";
import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



const App = () => {
  const user = true;
  return (
   <Router>
    <Routes> 
      <Route exact path="/" element={user ? <Home /> : <Navigate replace to="/register" />}/>

      <Route path="/register" element={!user ? <Register /> : <Navigate replace to="/" />}/>

      <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />}/>
        
        {
          user && (
            <>
            <Route path="/movies" element={<Home type="movies"/>}/>
            
            <Route path="/series" element={<Home type="series"/>}/>
            
            <Route path="/watch" element={<Home type="watch"/>}/> 
            </>
          )
        }
     </Routes>
    </Router>
  );
};


export default App;