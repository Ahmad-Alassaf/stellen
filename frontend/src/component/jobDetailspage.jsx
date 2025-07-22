import React from 'react'
import   { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReadMoreLess from './readMoreLess'
import { FaLocationDot } from "react-icons/fa6"
import { FaTrash     } from 'react-icons/fa'
import {   BiSolidLike } from 'react-icons/bi'
import Comment from './comment'
import { useLocation } from 'react-router-dom'
import JobdetailsComponent from './jobdetailsComponent'
const JobDetailsPage = () => {
     const location=useLocation()
     const {job}=location.state
    

  
  return (
    <div className='container'>
      
      <JobdetailsComponent job={job } />
      
    </div>)
  
  
}
export default JobDetailsPage
