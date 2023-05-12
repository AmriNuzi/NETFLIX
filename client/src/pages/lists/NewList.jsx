import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { getToken } from '../../storage';
import axios from 'axios';


function NewList(props) {
  const [list , setList] = useState(props.list || {});
  const [error, setError] = useState();

  const [submited, setSubmited] = useState();

console.log("listaa", list)
  const onChange = (value, fieldName) => {
    const newObj = {};
    newObj[fieldName] = value;
    setList({...list, ...newObj});
}

  useEffect(()=>{
    const getList = async ()=>{
      try {
        const res = await axios.get(
          `/lists`,
          {
            headers:{
              token:
              "Bearer " + getToken()
            },
          }
        )
        // setLists(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getList()
  },[])

  const handleSubmit=()=>{


    setError('');
    if(props.isUpdate){
      props.onSave(list);
      return;
    }

    
    axios.post(
      `/lists`,
      list,
      {
        headers:{
          token:
          "Bearer " + getToken()
        },
      }
    ).then(res=>{
      setSubmited(true);
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
       <div className='home-create-user'>
        <Navbar/>
        <div className='main'>
            <h2>New List</h2>
           
            <div className='form-item'>
                <span>Title</span>
                <input onChange={(e) => onChange(e.target.value,'title')} value={list['title'] || ""} type="text"/>
            </div>
            <div className='form-item'>
                <span>Type</span>
                <input onChange={(e) => onChange(e.target.value,'type')} value={list['type'] || ""} type="text"/>
            </div>
            <div className='form-item'>
                <span>Genre</span>
                <input onChange={(e) => onChange(e.target.value,'genre')} value={list['genre']|| ""} type="text"/>
            </div>
            <div className='form-item'>
                <button onClick={handleSubmit} type='submit'> Submit</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default NewList
