
import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
const Navbar = ({userState}) => {
  const [userData,setUserData] = userState;

  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/" className='heading'>TaskBuddy</Link>
        </li>
        <li className='auth-link'>
        <li>
          {userData?.jwtToken?"":<Link to="/signup">Sign Up</Link>}
        </li>
        
        <li>
          {userData?.jwtToken?<Link to="/logout">Logout</Link>:<Link to="/signin">Sign In</Link>}
        </li>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
