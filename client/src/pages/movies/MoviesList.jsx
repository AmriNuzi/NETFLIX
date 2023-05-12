import React,{useState} from 'react';
import Navbar from "../../components/navbar/Navbar";
import "./movieList.scss";
import { getToken } from '../../storage/';
import axios from "axios";
import { Button } from '@mui/material';
import New from "./New.jsx";




const MoviesList = () => { 

    const [moviesList, setMoviesList] = useState([])
    const [ createNew, setCreateNew ] = useState(false)
    const [ currentMovie, setCurrentMovie] = useState()

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
              `/movies/`,
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
              `/movies/${id}`,
              {
                headers:{
                  token: 
                   "Bearer " + getToken()
                },
              }
            );

            getAllMovies();
            // window.location.reload()
          } catch (err) {
            console.log(err);
          }
    }

    //edito nje film
    const editMovie = async (movie)=>{
      const id = movie._id;  
      try {
            const res = await axios.put(
              `/movies/${id}`,
              movie,
              {
                headers:{
                  token: "Bearer " + getToken(),
                },
              }
            );
            getAllMovies();
            setCurrentMovie(undefined);
          } catch (err) {
            console.log(err);
          }
    }
    

    React.useEffect(()=>{
        getAllMovies()
    },[])


    // console.log(" DATA", moviesList)


  return(
<>
<Navbar/>
<div className='home' >
      <div className='movie-list' >
        {
         currentMovie &&  <New isUpdate={true} movie={currentMovie} onSave={editMovie} />
        }
        {
          createNew ? <New onSave={handleOnSave} />
          :(
            <Button onClick={handleCreateNew} >Create New Movie</Button>
          )
        }
      <div>
        
      </div>    
          <span style={{color:'white',
                        fontSize:'30px' ,
                        fontFamily:'bold'
                        }}>List of movies</span>

                       <br/>  
                {moviesList.map((item, index)=>{
                    return( 
                      
                        <p className='text' key={index}>{item.title}{item.desc}
                        <Button onClick={() => setCurrentMovie(item)}>Edit</Button>
                        <Button onClick={() => deleteMovie(item._id)}>Delete</Button>
                        </p>
                    )
                })}
            </div>
        </div>
</>
    )
}

export default MoviesList;