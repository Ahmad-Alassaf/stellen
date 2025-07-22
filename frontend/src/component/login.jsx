// eslint-disable-next-line no-unused-vars
import  {  useEffect, useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../features/authSlice'

const Login = () => {

  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const {email,password}=formData
 

  const handleOnChange=(e)=>{
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })

   
  }
  const dispatch=useDispatch()
  const handleSubmit= (e)=>{
                        e.preventDefault()
                       dispatch(login(formData))
                     
                    }

        useEffect(()=>{
          if(user)
          {
            navigate('/')
      
          }
        },[user])
  return (
    <div>
        <div className='container  pt-5'>
          <div className="row justify-content-center ">
             
             <div className="col-md-8 col-lg-4  shadow-lg rounded px-2 py-3">
                <form onSubmit={handleSubmit} className=''>
                  <div className="">
                      <h1 className='text-center text-primary' ><FaSignInAlt /></h1>
                      <h1 className='text-center'>Login</h1>
                      
                  </div>
                  <div className='text-danger'>
                    
                  </div>
                  <input type="text" name='email' value={email} placeholder='email...' className='form-control mb-1' onChange={handleOnChange}/>
                  <input type="password" name='password' value={password} placeholder='password...' className='form-control mb-1'  onChange={handleOnChange}/>
                  <div className=" text-center ">
                    <button type='submit' className='btn btn-primary w-100 ' >Login </button>
                    <span className='d-block'> <Link to="/register">Konto erstellen...</Link></span>
                  </div>
                 
              </form>

             </div>
          </div>
          
          
          

        </div>
      
    </div>)
  
}

export default Login
