import * as React from "react";
import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import New from "./pages/movies/New";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectIsUserLogged } from "./store/login/loginSlice";
import {getToken} from './storage/index';
import MoviesList from "./pages/movies/MoviesList";


const App = () => {

  const isUserLogged = useSelector(selectIsUserLogged);
  
  const [user, setUser] = React.useState(isUserLogged)



  React.useEffect(()=>{

    const token = getToken();
    
    if(token){
      setUser(true);

      
    }else{
      setUser(false);
    }

  },[isUserLogged])




  return (
   <Router>
    <Routes> 

    <Route path="/" element={user ? <Home />: <Login />}/>

 {user ?
 <>
 <Route path="/movies" element={<Home type="movies"/>}/>
 
 <Route path="/series" element={<Home type="series"/>}/>
 
 <Route path="/watch" element={<Home type="watch"/>}/> 

 <Route path="/new-movie" element={<New/>}/> 
 <Route path="/movies-list" element={<MoviesList/>}>
    {/* <Route path="/moive-list" element={<New/>}/> */}
  </Route> 

 </>
 : 
 <>
   <Route path="/register" element={ <Register />}/>

   <Route path="/login" element={user ?<Home type="watch"/> :  <Login />}/>
 </>
}
     </Routes>
    </Router>
  );
};


export default App;