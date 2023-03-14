import React,{useState} from 'react';
import Navbar from "../../components/navbar/Navbar";
import "./movieList.scss";
import { getToken } from '../../storage/';
import axios from "axios";
import { Button } from '@mui/material';
import New from "./New.jsx";



const MoviesList = (props) => { 

    const [moviesList, setMoviesList] = useState([])
    const [ createNew, setCreateNew ] = useState(false)

    const handleOnSave=()=>{
        setCreateNew(false)
    }
    
    const handleCreateNew = () =>{
        setCreateNew(true)
    }

    //Merr the gjitha filmat
    const getAllMovies = async() =>{
        try {
            const res = await axios.get(
              "/movies",
              {
                headers:{
                  token: 
                   "Bearer " + getToken()
                },
              }
            );
            setMoviesList(res.data);
          } catch (err) {
            console.log(err);
          }
    }

    //Ben delete nje filmi
    const deleteMovie = async(id)=>{
        try {
            const res = await axios.delete(
              `/movies${id}`,
              {
                headers:{
                  token: 
                   "Bearer " + getToken()
                },
              }
            );
            getAllMovies()
          } catch (err) {
            console.log(err);
          }
    }


    //edito nje film
    const editMovie =async (id, movie)=>{
        try {
            const res = await axios.put(
              `/movies${id}`,
              {
                headers:{
                  token: "Bearer " + getToken(),
                  body: JSON.stringify(movie)
                },
              }
            );
            getAllMovies()
          } catch (err) {
            console.log(err);
          }
    }
    

    React.useEffect(()=>{
        getAllMovies()
    },[])


    console.log(" DATA", moviesList)


    return(
<>
<Navbar/>
<div className='home' >

    
      <div className='movie-list' >
        {
          createNew ? <New onSave={handleOnSave} />
          :(
            <Button onClick={handleCreateNew} >Create New</Button>
          )
        }
      <div>
        
      </div>          
                {moviesList.map((item, index)=>{
                    return( 
                        <p className='text' key={index}>{item.title}{item.desc}
                        <Button onClick={() =>props.deleteMovie()}>delete</Button>
                        </p>
                    )
                })}

            </div>
            
        </div>
</>
    )
}

export default MoviesList;