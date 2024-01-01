import React, { useState } from 'react'
import "./SignUp.css"
import { register } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
const SignUp = () => {

    const initial = {
        username:"",
        email:"",
        password:"",
        cpassword:""
    }
    const [user,setUser] = useState(initial);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = (message) => {
        setAlertMessage(message)
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const signup = async(e) => {
        e.preventDefault();
        if(user.username === "" || user.password == "" || user.email == "") {
            handleShowAlert("Enter the fields correctly!")
            return;
        }
            
        if(user.password != user.cpassword) {
            handleShowAlert("Password doesn't match with Confirm password!")
            return;
        }
        const data = await register(user);
        if(data?.status == 201)
            navigate("/signin")
        else {
            handleShowAlert(data.data)
            return;
        }

    }

    const changeHandler = (e) => {
        setUser({...user,[e.target.name]:e.target.value});
    }

  return (
    <>
    {showAlert && (
        <Alert
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
    <div className='signup-page'>
        <div className='signup-container'>
            <div className='signup-head'> <h1>Sign Up</h1></div>
            <div className='signup-username inp'>
                <label htmlFor='username'>UserName:</label>
                <input className='username' id='username' name='username' onChange={(e) => changeHandler(e)}/>
            </div>
            <div className='signup-email inp'>
                <label htmlFor='email'>Email:</label>
                <input className='email' id='email'type='email' name='email'onChange={(e) => changeHandler(e)}/>
            </div>
            <div className='signup-password inp'>
                <label htmlFor='password'>Password:</label>
                <input className='password' id='password' type='password' name='password' onChange={(e) => changeHandler(e)}/>
            </div>
            <div className='signup-password inp'>
                <label htmlFor='cpassword'>Confirm Password:</label>
                <input className='cpassword' id='password' type='password' name='cpassword' onChange={(e) => changeHandler(e)}/>
            </div>
            <div className='signup-btn'>
                <button className='btn-signup' onClick={(e) => signup(e)}>Sign Up</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default SignUp