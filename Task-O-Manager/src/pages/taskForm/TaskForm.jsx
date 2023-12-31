// TaskForm.jsx

import React, { useState } from 'react';
import './TaskForm.css'; // Import your CSS file for styling
import { addTask } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({userState}) => {
  const [newTask, setNewTask] = useState({ title: '', description: ''});
  const [userData,setUserData] = userState
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '') {
      const data = await addTask(newTask,userData?.jwtToken)
      if(data.status == 201) {
        navigate("/")
      }

    }
  };

  return (
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
  );
};

export default TaskForm;
