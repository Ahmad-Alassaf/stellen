import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import JobCard from './jobCard'

const ShowSerachResult = () => {
    const location=useLocation()
     const [showdetail,setShowdetail]=useState(false)
     const [job,setJob]=useState(null)
    const navigate=useNavigate()
    const {result}=location.state 
    const handleClickOnJob=(job)=>{                                        

        } 
        const handleCurrentLocation=(mypath)=>{
            if(mypath.url !=='/')
            {
                setJob(mypath.job)
               setShowdetail(true)
            }
                


        }
        useEffect(()=>{
            if(showdetail)
                navigate('/jobdetailspage',{state:{job}})
             

        },[showdetail])
   
    
  return (
    <div className='container'>
        <div className="row">
            
                {result && ( result.map((item,index)=>(<div key={index}>{ <JobCard job={item}   currentLocation={handleCurrentLocation}/>}</div>)))
                    
                }
               
            
        </div>
      
    </div>
  )
}

export default ShowSerachResult
