import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { getToken } from '../../storage';


function NewUser(props) {
    const[user,setUser] = useState(props.user || {});
    const [error, setError]= useState('');

    const [submited, setSubmited] = useState();


    const onChange=(value, fieldName)=>{
        const newObj={};
        newObj[fieldName]=value;
        setUser({...user, ...newObj})
    }

    const [lists, setLists] = useState([]);


    useEffect(()=>{
        const getUser = async ()=>{
            try {
                const res = await axios.get(
                    `/users`,
                    {
                        headers:{
                            token:
                            "Bearer " + getToken()
                        },
                    }
                );
                setLists(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    },[]);

    const handleSubmit=()=>{
        // if(
        //     !user.username ||
        //     !user.email || 
        //     !user.password
        //     ){
        //         setError('check your inputs');
        //         return;
        //     }
            setError('');

            if (props.isUpdate) {
                props.onSave(user);
                return;
              }

            axios.post(
                `/users`,
                user,
                {
                    headers:{
                        token:"Bearer " + getToken()
                    },
                }
            ).then(res=>{
                resetForm()

                setSubmited(true);
            }).catch(err =>{
                console.log("errorr", err)
                console.log(err)
            })
    }

    const resetForm = ()=>{
        setUser({
            username: '',
            email: '',
            password:''
        });
    }

  return (
    <div className='home-create-user'>
        <Navbar/>
        <div className='main'>
    
            <h2>New User</h2>
            {
                submited && 
                <span>User created sucessfully</span>
            }
            {
                error &&
                <span style={{color:'red'}}>{error}</span>
            }
            <div className='form-item'>
                <span>Username</span>
                <input onChange={(e) => onChange(e.target.value,'username')} value={user['username']} type="text"/>
            </div>
            <div className='form-item'>
                <span>Email</span>
                <input onChange={(e) => onChange(e.target.value,'email')} value={user['email']} type="email"/>
            </div>
            <div className='form-item'>
                <span>Password</span>
                <input onChange={(e) => onChange(e.target.value,'password')} value={user['password']} type="password"/>
            </div>
            <div className='form-item'>
                <button onClick={handleSubmit} type='submit' > Submit</button>
            </div>
        </div>
    </div>
  )
}

export default NewUser