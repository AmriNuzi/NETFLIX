
import { PlayArrow, Add, ThumbUpOutlined, ThumbDownOutlined, } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getToken } from '../../storage/';
import { Link } from "react-router-dom";
import "./listItem.scss";

export default function ListItem({index, item}) {
    const[isHovered, setIsHovered] = useState(false);
    const[movie, setMovie] = useState({});
   
  useEffect(()=>{
    const getMovie = async ()=>{
      try {
        const res = await axios.get("/movies/" + item, {
          headers:{
            token: 
             "Bearer " + getToken(),
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }   
    };
    getMovie()
  },[item]);

  if (!movie) return <></>;
  
  return (
    <Link to={{pathname:"/watch", movie : movie}}>
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
    </Link>
  )
}
