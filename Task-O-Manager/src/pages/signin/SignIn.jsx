import React,{useState}from 'react'

import "./SignIn.css"
import { login } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
const SignIn = ({sign_in}) => {
    const initial = {
        username:"",
        password:"",
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
    const signin = async(e) => {
        e.preventDefault();
        if(user.username === "" || user.password === "")
            handleShowAlert("Enter the fields correctly!")
        

        const data = await login(user);

        if(data?.status == 200)
            sign_in(data.data)
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
    <div className='signin-page'>
    {showAlert && (
        <Alert
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
        <div className='signin-container'>
            <div className='signin-head'> <h1>Sign In</h1></div>
            <div className='signin-username inp'>
                <label htmlFor='username'>UserName:</label>
                <input className='username' id='username' name='username' onChange={(e) => changeHandler(e)}/>
            </div>
            <div className='signin-password inp'>
                <label htmlFor='password'>Password:</label>
                <input className='password' id='password' type='password' name='password' onChange={(e) => changeHandler(e)}/>
            </div>
           
            <div className='signin-btn'>
                <button className='btn-signin' onClick={(e) => signin(e)}>Sign In</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default SignIn