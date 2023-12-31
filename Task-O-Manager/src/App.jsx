import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import TaskForm from './pages/taskForm/TaskForm';
import Update from './pages/update/Update';
import Logout from './pages/logout/Logout';
function App() {
  const [userData, setUserData] = useState(null);
  const data = window.localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(()=>{
    if(data)
        setUserData(JSON.parse(data));
  },[])

  const logout = () => {
      window.localStorage.removeItem("user");
      setUserData(null)
      navigate("/");
  }

  const signin = (user) => {
    window.localStorage.setItem("user",JSON.stringify(user));
    setUserData(user)
    navigate("/");
  }
  
  return (
    <>
  
      <div className="App">
      <Navbar userState = {[userData,setUserData]}/>
        <Routes>
          <Route exact path='/' element={data ? <Home userState = {[userData,setUserData]}/> : <Navigate to="/signin"/>}/>
          <Route exact path="/update/:id" element = {data ? <Update userState = {[userData,setUserData]}/> : <Navigate to="/signin"/>}/>
          <Route exact path="/form" element={data ? <TaskForm userState = {[userData,setUserData]}/> : <Navigate to="/signin"/>}/>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn sign_in={signin}/>} />
          <Route exact path ="/logout" element = {<Logout logout={logout}/>}/>
        </Routes>
      </div>
      
    </>
  )
}

export default App
