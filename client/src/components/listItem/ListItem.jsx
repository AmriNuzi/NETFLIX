import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpOutlined,
  ThumbDownOutlined, 
} from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ListItem({index, item}) {
    const[isHovered, setIsHovered] = useState(false);
    const[movie, setMovie] = useState({});
   
  useEffect(()=>{
    const getMovie = async ()=>{
      try {
        const res = await axios.get("/movies/fin/d" + item, {
          headers:{
            token: 
             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzE5NTk2ZWU4OWJhY2QzNGE5NWE1MyIsImlzQWRtaW4iOmZhbHNlLCJ1c2VybmFtZSI6ImFtcmkiLCJpYXQiOjE2NjIyMTMzMDcsImV4cCI6MTY2MjY0NTMwN30.DDRq4MgmO0VtoKDXngRDPIwfathcvdLx6XgKMwBFHGc"
          }
        });
        setMovie(res.data);

      } catch (err) {
        console.log(err);
      }   
    };
    getMovie()
  },[item])

  return (
    <div 
    className="listItem" 
    style={{left: isHovered && index * 225 -50 + index * 2.5}}
    onMouseEnter={()=>setIsHovered(true)} 
    onMouseLeave={()=>setIsHovered(false)}
    >
        <img 
        src={movie.img} 
        alt="" 
        />
        {isHovered && (
        <>
        <video src={movie.trailer} autoPlay={true} loop />
        <div className="itemInfo">
          <div className="icons">
              <PlayArrow className="icon"/>
              <Add className="icon"/>
              <ThumbUpOutlined className="icon"/>
              <ThumbDownOutlined className="icon"/>
          </div>
          <div className="itemInfoTop">
            <span>{movie.duration}</span>
            <span className="limit">+{movie.limit}</span>
            <span>{movie.year}</span>
          </div>
          <div className="desc">
            {movie.desc}
          </div>
          <div className="genre">{movie.genre}</div>
        </div>
        </>
          )}
    </div>
  )
}
