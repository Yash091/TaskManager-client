import React, { useEffect, useState } from 'react'
import "./Update.css"
import { getTaskById, updateTask } from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
const Update = ({userState}) => {

  const [userData,setUserData] = userState;
  const {id} = useParams();
  const navigate = useNavigate();
  const initial = {
    title:"",
    description:"",
    status:""
  }
  const [task,setTask] = useState(initial);
  useEffect(()=>{
    const getData = async() => {
      
      const data = await getTaskById(id,userData?.jwtToken);
      setTask(data.data)
    }
    getData();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (task.title.trim() !== '') {
      const data = await updateTask(task,userData?.jwtToken,id)
      if(data.status == 200) {
        navigate("/")
      }

    }
  };

  const changeHandler = (e) => {
    setTask({...task,[e.target.name]:e.target.value})
  }
  
  return (
    <div className='form-body'>
        <div className="task-form">
      <h2>Update Task</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={(e) => changeHandler(e)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={(e) => changeHandler(e)}
        />

        <button type="submit">Update Task</button>
      </form>
    </div>
    </div>
  )
}

export default Update