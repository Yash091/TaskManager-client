import React, { useEffect, useState } from 'react'
import "./Update.css"
import { getTaskById, updateTask } from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
const Update = ({userState}) => {

  const [userData,setUserData] = userState;
  const {id} = useParams();
  const navigate = useNavigate();
  const initial = {
    title:"",
    description:"",
    status:""
  }
  const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = (message) => {
        setAlertMessage(message)
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
  const [task,setTask] = useState(initial);
  useEffect(()=>{
    const getData = async() => {
      
      const data = await getTaskById(id,userData?.jwtToken);
      if(data.status==200) {
        setTask(data.data)
      } else {
        handleShowAlert(data.data);
        return;
      }
      
    }
    getData();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (task.title.trim() !== '') {
      const data = await updateTask(task,userData?.jwtToken,id)
      if(data?.status == 200) {
        navigate("/")
      } else {
          handleShowAlert(data.data)
          return;
      }

    }
  };

  const changeHandler = (e) => {
    setTask({...task,[e.target.name]:e.target.value})
  }
  
  return (
    <div className='form-body'>
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
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