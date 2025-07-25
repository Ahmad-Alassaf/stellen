import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { FaBars } from 'react-icons/fa';
import { logout, reset } from "../features/authSlice";
import '../CSS/navbarMenue.css'
import logo from '../assets/StellenIcon.png'



const Header = () => {  
  const { user } = useSelector((state) => state.auth)
  const [isSticky, setIsSticky] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
    dispatch(reset());
  }
  const handleLinkToggle = () => {
  const collapseElement = document.getElementById('navbarSupportedContent');
  if (collapseElement) {
    collapseElement.classList.toggle('show'); // manually toggle
  }
}

useEffect(()=>{
  
   const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  return (
    <div className="position-relative">
      <nav className={`navbar navbar-expand-lg navbar-light baseStyle ${isSticky ? 'stickyStyle' : ''}  py-0`}   >
        <div className="container-fluid  ">
          <Link className="navbar-brand   text-white  text-center  py-0 " to="/">
           <img src={logo} className='img-fluid m-auto rounded'  style={{height:'50px',width:'50px'}}/> Stellen
          </Link>

          <button
            className="navbar-toggler   text-end border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
             <FaBars size={60} color="white" />
          </button>

          <div className="container collapse navbar-collapse  " id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-sm-center ">
             
              <li className="nav-item px-2 text-white  py-2 ">
                <Link className="nav-link text-white " to="/" onClick={handleLinkToggle}>
                 Startseite
                </Link>
              </li>
              <li className="nav-item px-2 py-2">
                <Link className="nav-link text-white" to="/newjob" onClick={handleLinkToggle}>
                 Für Arbeitsgeber
                </Link>
              </li>
              <li className="nav-item px-2 py-2">
                <Link className="nav-link text-white" to="/contactus" onClick={handleLinkToggle}>
                 Kontakt
                </Link>
              </li>
              <li className="nav-item px-2 py-2">
                <Link className="nav-link text-white" to="/" onClick={handleLinkToggle}>
                 Über uns
                </Link>
              </li>
              <li className="nav-item px-2 py-2">
                <Link className="nav-link text-white" to="/dashboard" onClick={handleLinkToggle}> 
                 DashBoard
                </Link>
              </li>
            </ul>

           

            <ul className="navbar-nav   mb-2 mb-lg-0 text-sm-center">
              {user ? (
                <li className="navbar-item  dropdown  ">
                  <button  className="nav-link text-white dropdown-toggle    m-sm-auto" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.username}
                  </button>
                  <ul className="dropdown-menu border-0 text-center mt-2 " aria-labelledby="navbarDropdown">
                     <li><Link to="/profile"> Meine  Profil</Link> </li>
                       
                        <li ></li>
                        <li><Link to="/jobslist"> myJobs</Link> </li>
                       
                        <li > <Link onClick={handleSignOut}> Sign out</Link> </li>
                    </ul>
                 
                </li>
              ) : (
                <li className="navbar-item">
                  <Link to="/login" className="nav-link text-white">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
