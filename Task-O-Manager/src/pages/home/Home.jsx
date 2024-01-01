import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Home.css"
import Task from '../../components/task/Task';
import { Link } from 'react-router-dom';
import { getAllTasks } from '../../service/api';
const Home = ({userState}) => {
    const [tasks, setTasks] = useState([]);
      const [userData,setUserData] = userState
      useEffect(()=>{
          const getTasks = async(id,jwtToken) => {
              const data = await getAllTasks(id,jwtToken);
              if(data?.status==200)
                setTasks(data.data)
          }
          getTasks(userData?.id,userData?.jwtToken);
      },[userData])

      const moveTask = (taskId, newStatus) => {
        const updatedTasks = tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
      };

      const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task=> task.id!==taskId)
        setTasks(updatedTasks)
      }

  return (
    <>
    <div className='home-page'>
        <div className='add-task'><Link className="custom-link" style={{textDecoration:"none",color:"GrayText"}} to={"/form"}>➕Add Task</Link></div>
        <div className="task-manager">
      <div className="container" id="pending">
        <h2 style={{color:"red"}}>Pending</h2>
        <div className='tasks'>
          {tasks
            .filter(task => task.status === 'PENDING')
            .map(task => (
                <div className='task'><Task id={task.id} title={task.title}description ={task.description} status={task.status} jwtToken = {userData?.jwtToken} moveTask={moveTask} deleteTask={deleteTask}/></div>
            ))}
        </div>
      </div>

      <div className="container" id="active">
        <h2 style={{color:"blue"}}>Active</h2>
        <div className='tasks'>
          {tasks
            .filter(task => task.status === 'ACTIVE')
            .map(task => (
                <div className='task'><Task id={task.id} title={task.title}description ={task.description} status={task.status} jwtToken = {userData?.jwtToken} moveTask={moveTask} deleteTask={deleteTask}/></div>
            ))}
        </div>
      </div>

      <div className="container" id="completed">
        <h2 style={{color:"green"}}>Completed</h2>
        <div className='tasks'>
          {tasks
            .filter(task => task.status === 'COMPLETED')
            .map(task => (
              <div className='task'><Task id={task.id}title={task.title}description ={task.description} status={task.status} jwtToken = {userData?.jwtToken} deleteTask={deleteTask}/></div>
            ))}
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Home