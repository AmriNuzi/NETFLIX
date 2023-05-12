import Navbar from "../../components/navbar/Navbar";
import "../home/home.scss"
import List from "../../components/list/List";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getToken } from '../../storage/';
import './newMovie.scss'


const Home = (props) => {
  
    const [movie, setMovie] = useState(props.movie || {});
    const [error, setError] = useState('');
    
    const [errorTitle, setErrorTitle] = useState('');
    
    const [submited, setSubmited] = useState();

    const onChange = (value, fieldName) => {
        const newObj = {};
        newObj[fieldName] = value;
        setMovie({...movie, ...newObj});
    }

    const [lists, setLists] = useState([]);

   useEffect(()=>{
    const getRandomLists = async()=>{
      try {
        const res = await axios.get(
          "/lists",
          {
            headers:{
              token: 
               "Bearer " + getToken()
            },
          }
        );
          setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getRandomLists();
  }, []);

    const handleSubmit = () => {
        // if (
        //     !movie.title ||
        //     !movie.desc ||
        //     !movie.img ||
        //     !movie.imgSm ||
        //     !movie.imgTitle ||
        //     !movie.trailer ||
        //     !movie.video ||
        //     !movie.year ||
        //     !movie.limit ||
        //     !movie.genre ||
        //     !movie.isSeries ||
        //     !movie.list

        // ) {
        //     setError('Title, Description, Image URL, Small Image URL, Trailer URL, Video URL, Year, Limit +, Genre, Is Serie, List are required!')
        //     return ;
        // }

        setError(''); 
        if (props.isUpdate) {
          props.onSave(movie);
          return;
        }

            axios.post(
              `/movies`,
              movie,
              {
                headers:{
                  token: 
                   "Bearer " + getToken()
                },
              }
            ).then(res => {
                resetForm()
                setSubmited(true);
            }).catch(err => {
                console.log(err);
          })
    }

    const resetForm = () => {
        setMovie({
            title: '',
            desc: '',
            img: '',
            imgSm: '',
            imgTitle: '',
            trailer: '',
            video: '',
            year: '',
            limit: '',
            genre: '',
            isSeries: true,
            list: ''
        });
    }

  return (
    <div className="home-ceate-moive">
      <Navbar/>
      <div className="main">
        <h2>New Movie</h2>
        {
            submited && 
            <span>Movie created sucessfully</span>
        }
        {
            error && 
            <span style={{color: 'red'}}>{error}</span>
        }
        <div className="form-item">
            <span>Title</span>
            <input onChange={(e) => onChange(e.target.value, 'title')} value={movie.title} type="text" />        
        </div>

        <div className="form-item">
            <span>Desc</span>
            <textarea onChange={(e) => onChange(e.target.value, 'desc')} value={movie['desc']} type="text" />        
        </div>


        <div className="form-item">
            <span>Image URL</span>
            <input onChange={(e) => onChange(e.target.value, 'img')} value={movie['img']} type="text" />        
        </div>


        <div className="form-item">
            <span>Small Image URL</span>
            <input onChange={(e) => onChange(e.target.value, 'imgSm')} value={movie['imgSm']} type="url" />        
        </div>

        <div className="form-item">
            <span>Trailer URL</span>
            <input onChange={(e) => onChange(e.target.value, 'trailer')} value={movie['trailer']} type="url" />        
        </div>

        <div className="form-item">
            <span>Video URL</span>
            <input onChange={(e) => onChange(e.target.value, 'video')} value={movie['video']} type="url" />        
        </div>
        
        <div className="form-item">
            <span>Year</span>
            <input onChange={(e) => onChange(e.target.value, 'year')} value={movie['year']} type="number" />        
        </div>
        
        <div className="form-item">
            <span>Limit +</span>
            <input onChange={(e) => onChange(e.target.value, 'limit')} value={movie['limit']} type="number" />        
        </div>
        

        <div className="form-item">
            <span>Genre</span>
            <input onChange={(e) => onChange(e.target.value, 'genre')} value={movie['genre']} type="text" />        
        </div>
        
        
        <div className="form-item">
            <span>Is serie</span>
            <select onChange={(e) => onChange(e.target.value, 'isSeries') }>
                <option value={true}>true</option>
                <option value={false}>false</option>
            </select>
        </div>

        <div className="form-item">
            <span>List</span>
            <select onChange={(e) => onChange(e.target.value, 'list') }>
                {lists.map(item => {
                  return <option value={item._id}>{item.title}</option>
                })}
            </select>
        </div>

        <div className="form-item">
            <button onClick={handleSubmit} type='submit'>Submit</button>
        </div>
        </div>
    </div>
  );
};

export default Home
