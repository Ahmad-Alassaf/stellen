import React from 'react'
import   { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReadMoreLess from './readMoreLess'
import { FaLocationDot } from "react-icons/fa6"
import { FaTrash ,FaStore    } from 'react-icons/fa'
import {   BiSolidLike } from 'react-icons/bi'
import Comment from './comment'
import useScreenSize from './useScreenSize'
import { useNavigate } from 'react-router-dom'
import TimeAgo from './timeAgo'
const JobCard = ({job}) => {

    const screen=useScreenSize()
    const navigate=useNavigate()
   
    const [shadow, setShadow] = useState("0px 0px 0px rgba(0,0,0,0)");
    
    const {user}=useSelector((state)=>state.auth)
    const [likeColor,setLikeColor]=useState('btn-secondary')
    const [addComment,setAddComment]=useState('')
    const [showComments,setShowComments]=useState(false)
const givePullLike=async(job)=>{
  try {
      const headers={
          "Content-Type":"application/json",
          Authorization:`Bearer ${user.token}`
      }
      if(job.likes.some(like=>like.userId===user._id))
      {
         
          const unliked=await axios.post(`/api/jobs/pulllike/${job._id}`,job,{headers})
          if(unliked)
              setLikeColor('btn btn-secondary')
      }
      else
      {
          const liked=await axios.post(`/api/jobs/givelike/${job._id}`,job,{headers})
          if(liked)
              setLikeColor('btn btn-primary')
      }
  } catch (error) {
      console.log(error)
  }
}
const toggleComment=(id)=>{
                        setAddComment(id)
                        setShowComments( prev => !prev)
}
const handleOnClick=(id)=>{
    navigate(`/job/${id}`,{state:{job}})
   
}
useEffect(()=>{
    
})
const style={
    jobcardstyle:{
        cursor:'pointer',
        boxShadow: shadow,
        transition: "box-shadow 0.3s ease-in-out",
    }
}
  return (
    
        <div className="card  h-100 w-100   mb-1" style={style.jobcardstyle}    
         onClick={()=>handleOnClick(job._id)} onMouseEnter={() => setShadow("5px 5px 15px rgba(0, 0, 0, 0.3)")}
          onMouseLeave={() => setShadow("0px 0px 0px rgba(0,0,0,0)")} >
                <div className="card-header  border-0 ">
                    
                        <div className=' text-center text-md-start '>
                            <div className="d-flex justify-content-between">
                                  <h5 className='text-primary  px-1 py-0 my-0'> {job.title} </h5>
                                 

                            </div>
                          
                            <div className="d-flex">
                                 <p className='text-primary fst-italic my-0 p-0 text-muted px-2'>  {job.companyName}</p>
                                 <p className='fs-6 p-0 m-0 text-muted'><TimeAgo timestamp={job.createdAt} /></p>

                            </div>
                                                                                  
                        </div>                    
                                
                </div>
                <div className="card-body bg-white   pt-0" style={{ whiteSpace: "pre-wrap"}}>  
                    <div className='d-flex m-1'>
                        <p className='m-0 text-center text-danger  d-block'><FaLocationDot /></p>
                        <p className='my-0 px-1 text-center d-block'>{job.location}</p>   
                    </div> 
                    <ul className='list-group '>
                      <li className='list-group-item  py-0  rounded border-0 '><span className='text-primary '>&#10004;</span>{job.performances[0]} </li>
                      <li className=' list-group-item py-0  rounded border-0 text-wrap'><span className='text-primary'>&#10004;</span> {job.type }<br/> {(job.workingdays.map((day,index)=>day+(index+1<job.workingdays.length ? ', ':'')))} </li>  
                      
                      <li className='list-group-item py-0   rounded border-0 '><span className='text-primary'>&#10004;</span> {job.salary.type==='hourly'? 'Pro Stunde' :'monthly'} ab {job.salary.amount} € </li>
                     
                    </ul>         
                         
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center border-0 ">
                    <p className='p-0 m-0 '>{job?.savedJobList.length}<FaStore /></p>
                    <p className='p-0 m-0 '>  {job?.likes.length } <BiSolidLike /></p>
                       
                   
               </div>
         </div>
        
  
  )
}
export default JobCard
