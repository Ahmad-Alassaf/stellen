import React from 'react'
import './searchCSS.css'
import Job from './job'
import {Link ,Navigate,useNavigate} from 'react-router-dom'
import { motion } from "framer-motion"
const SearchResult = ({resultsList}) => {
  const navigate = useNavigate();
  const handleOnClick=(item)=>{
   
    navigate("/job", { state: { job: item } })  
} 
const style={
 

}  
  return (
    <div className='container  my-1 '>
      <div className="row  p-0 ">
        <div className=" col-9 p-0">
       

        </div>
      </div>
       
      
      
    </div>
  )
}

export default SearchResult
