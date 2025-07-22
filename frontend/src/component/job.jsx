import React from 'react'
import { useLocation } from "react-router-dom";



const Job = () => {
    const location = useLocation();
    const job = location.state?.job;
   

  return (
    <div className='container text-center py-5'>
        <h1 className='bg-secondary  text-white rounded'>{job.title}</h1>
        <p className='text-start px-2 ' style={{whiteSpace:'pre-wrap'}}>{job.description}</p>
        <div className='d-flex'>
        <span className='bg-secondary px-2 text-white rounded-4 mx-1'> {job.type} </span>
        <span className='bg-secondary px-2 text-white rounded-4 mx-1'> {job.salary} € </span>
        </div>
    </div>
  )
}

export default Job
