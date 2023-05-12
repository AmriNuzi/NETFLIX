import React, { useState } from 'react'
import "./userList.scss";
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { getToken } from '../../storage';
import { Button } from '@mui/material';
import NewUser from './NewUser';

function UserList() {
    const [userList, setUserList] = useState([]);
    const [createNew, setCreateNew] = useState(false);
    const [ currentUser, setCurrentUser] = useState()

    const handleOnSave= ()=>{
        setCreateNew(true)
    }

    const handleCreateNew =()=>{
        setCreateNew(true)
    }

    //merr te gjith user-at
    const getAllUsers = async()=>{
        try {
            const res= await axios.get(
                "users",
                {
                    headers:{
                        token:
                        "Bearer " + getToken()
                    },
                }
            );
            setUserList(res.data);
        } catch (err) {
            console.log(err)
        }
    }


    //delete user 
    const deleteUser = async(id)=>{
        try {
            const res = await axios.delete(
                `/users/${id}`,
                {
                    headers:{
                        token:
                        "Bearer " + getToken()
                    },
                }
            ) 
            getAllUsers();
        } catch (err) {
            console.log(err)
        }
    }



    React.useEffect(()=>{
        getAllUsers()
    },[])

     //edito nje user
     const editUSer = async (new_user)=>{
        const id = new_user._id;  
        try {
              const res = await axios.put(
                `/users/${id}`,
                new_user,
                {
                  headers:{
                    token: "Bearer " + getToken(),
                  },
                }
              );
              getAllUsers();
              setCurrentUser(undefined);
            } catch (err) {
              console.log(err);
            }
      }
      

  return (
    <>
    <Navbar/>
        <div className='home'>
            <div className='user-list'>
            {
         currentUser &&  <NewUser isUpdate={true} user={currentUser} onSave={editUSer} />
           }
                {
                    createNew ? <NewUser onSave ={handleOnSave}/>
                    :(
                        <Button onClick={handleCreateNew}>Create New User</Button>
                    )
                }
            </div>
            <div>
                <span style={{  color:'white',
                        fontSize:'30px' ,
                        fontFamily:'bold'
                        }}> User List
                </span>

                <br/>
                <br/>

            {userList.map((item, index)=>{
                return(
                    <p className='text' key={index}>{item.username}
                    <Button onClick={()=> setCurrentUser(item)}>edit</Button>

                    <Button onClick={()=> deleteUser(item._id)}>delete</Button>
                    </p>
                )
            })}        
            </div>
        </div>
    </>
    
  )
}

export default UserList
