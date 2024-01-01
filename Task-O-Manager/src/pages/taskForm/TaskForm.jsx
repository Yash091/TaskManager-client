// TaskForm.jsx

import React, { useState } from 'react';
import './TaskForm.css'; // Import your CSS file for styling
import { addTask } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/Alert';

const TaskForm = ({userState}) => {
  const [newTask, setNewTask] = useState({ title: '', description: ''});
  const [userData,setUserData] = userState
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = (message) => {
        setAlertMessage(message)
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '') {
      const data = await addTask(newTask,userData?.jwtToken)
      if(data?.status == 201) {
        navigate("/")
      } else{
        handleShowAlert(data.data + " Try Logging In again");
      }
    }
  };

  return (
    <>
    {showAlert && (
        <Alert
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
      <div className='form-body'>
        <div className="task-form">
      <h2>Create Task</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />

        <button type="submit">Create Task</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default TaskForm;
