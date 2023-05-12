import React, { useState } from 'react'
import "./listList.scss";
import Navbar from '../../components/navbar/Navbar';
import { getToken } from '../../storage';
import axios from 'axios';
import { Button} from '@mui/material';
import NewList from './NewList';
// import { Button } from '@material-ui/icons';




function ListList() {
    const [listList, setListList] = useState([]);
    const [createNew, setCreateNew] = useState(false);
    const [ currentList, setCurrentlIst] = useState()

    const handleOnSave=()=>{
        setCreateNew(false)
    }

    const handleCreateNew = ()=>{
        setCreateNew(true);
    }

// merr te gjitha Listat
    const getAllLists = async()=>{
        try {
            const res = await axios.get(
                "lists",
                {
                    headers:{
                        token:
                        "Bearer " + getToken()
                    },
                }
            );
            setListList(res.data);
        } catch (err) {
            console.log(err)
        }
    }


    // Fshin nje list 
    const deleteList = async (id) =>{
        try {
            const res = await axios.delete(
                `/lists/${id}`,
                {
                    headers:{
                        token: 
                        "Bearer " + getToken()
                    },
                }
            )
            getAllLists();
        } catch (err) {
            console.log(err)
        }
    }


  

      //edito nje list
      const editLIst = async (new_list)=>{
        const id = new_list._id;  
        try {
              const res = await axios.put(
                `/lists/${id}`,
                new_list,
                {
                  headers:{
                    token: "Bearer " + getToken(),
                  },
                }
              );
              getAllLists();
            //   setCurrentlIst();
            } catch (err) {
              console.log(err);
            }
      }
       React.useEffect(()=>{
        getAllLists()
    },[])
 


  return (
  <>
  <Navbar/>
    <div className="home">
        <div className="list-List">
        {
         currentList &&  <NewList isUpdate={true} list={currentList} onSave={editLIst} />
        }
            {
                createNew ? <NewList onSave={handleCreateNew}/>
                :(
                    <Button onClick={handleCreateNew}>Create New List </Button>
                )
            }
       </div>
       <div>
        <span style={{  color:'white',
                        fontSize:'30px' ,
                        fontFamily:'bold'
                        }}> List of Lists </span>

                        <br/>
                        <br/>
            {listList.map((item, index)=> {
                return(
                    <p className='text'key={index}>{item.title}
                        <Button onClick={() => setCurrentlIst(item) } >edit</Button>  
                        <Button onClick={() => deleteList(item._id) } >delete</Button>  
                    </p>
                )
            })}
        </div>
    </div>
  </>
  )
}

export default ListList
