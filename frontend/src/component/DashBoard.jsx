import React from 'react'
import { Link,Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div className='container py-1 ' style={{minHeight:'100vh'}}>
      
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container collapse navbar-collapse  " >

               
           
                            <ul className='navbar-nav m-auto mb-2 mb-lg-0'>
                                <li className='nav-item px-2'>
                                     <Link className="nav-link" to="category">
                                           Category
                                        </Link>
                                    </li>
                                <li className='nav-item px-2'>
                                     <Link className="nav-link" to="/">
                                           Users
                                        </Link>
                                        </li>
                                <li className='nav-item px-2'>
                                     <Link className="nav-link" to="/">
                                           Arbeitssuchende
                                        </Link>
                                        </li>
                                <li className='nav-item px-2'>
                                     <Link className="nav-link" to="/">
                                           Arbeitsgeber
                                        </Link>
                                        </li>
                            
                            </ul>
                 </div>
             </nav>
             <div className="container py-4">
                    <Outlet />
                </div>
       
       
      
    </div>
  )
}

export default DashBoard
