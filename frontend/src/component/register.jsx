// eslint-disable-next-line no-unused-vars
import   { useState ,useEffect} from 'react';
import { FaUserCircle  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

import {useSelector,useDispatch } from 'react-redux'
import { register } from '../features/authSlice';

const Register = () => {
  const dispatch=useDispatch()
    const [formData,setFormData]=useState({
      username:'',
      email:'',
      password:'',
      confirmpassword:''
    })
    const {username,email,password,confirmpassword}=formData
    const {user,success,message}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
  
  const handleOnChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
   
  }
   useEffect(()=>{
            if(user)
            {
              navigate('/')
        
            }
          },[user])
  const handleSubmit=async (e)=>{
    e.preventDefault()
    dispatch(register(formData))
   
  }
 
  return (
    <div>
        <div className='container  pt-5'>
          <div className="row justify-content-center ">
             
             <div className="col-md-8 col-lg-4  shadow-lg rounded px-2 py-3">
                <form onSubmit={handleSubmit} className=''>
                  <div className="">
                      <h1 className='text-center text-primary' ><FaUserCircle   /></h1>
                      <h1 className='text-center'>Sign In</h1>
                      
                  </div>
                  <div className="text-danger text-center">{message}</div>
                  <input type="text" name='username' value={username} placeholder='username...' className='form-control mb-1' onChange={handleOnChange} />
                  <input type="email" name='email' value={email}  placeholder='email...' className='form-control mb-1'   onChange={handleOnChange}/>
                  <input type="password" name='password' value={password}  placeholder='password...' className='form-control mb-1'  onChange={handleOnChange}/>
                  <input type="password" name='confirmpassword' value={confirmpassword}  placeholder='confirm password...' className='form-control mb-1'  onChange={handleOnChange} />
                  <div className=" text-center ">
                    <button type='submit' className='btn btn-primary w-100 ' >Sign In </button>
                   
                  </div>
                 
              </form>

             </div>
          </div>
          
          
          

        </div>
      
    </div>
  )
}



export default Register
