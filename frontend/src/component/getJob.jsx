import React from 'react'
import   { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReadMoreLess from './readMoreLess'
import { FaLocationDot } from "react-icons/fa6"
import { FaTrash, FaStore     } from 'react-icons/fa'
import {   BiSolidLike } from 'react-icons/bi'
import Comment from './comment'
import { useParams } from 'react-router-dom'

const GetJob = () => {
        const {id}=useParams()
        const [job,setJob]=useState(null)
       const {user}=useSelector((state)=>state.auth)
       const [likeColor,setLikeColor]=useState('btn-secondary')
       
       const[url,setUrl]=useState(null)
       const [loading, setLoading] = useState(true)
    

   const headers={
          "Content-Type":"application/json",
          Authorization:`Bearer ${user?.token}`
      }
    const getJob=async()=>{
        try {
            const response=await axios.get(`/api/jobs/job/${id}`)
            if(response)
            {
                console.log(response.data)
                setJob(response.data)
                setLoading(false)

            }   
        } catch (error) {
            console.log(error)
            
        }
    }
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
              {
                getJob()

              }
                         
             
          }
          else
          {
             
              const liked=await axios.post(`/api/jobs/givelike/${job._id}`,job,{headers})
              if(liked)
              {
                getJob()
              }
                 
          }
      } catch (error) {
          console.log(error)
          
      }
    }
    const saveunsaveJob=async (job)=>{
       const headers={
              "Content-Type":"application/json",
              Authorization:`Bearer ${user.token}`
          }
        
       try {
         if(job.savedJobList.filter(item=>item.userId===user._id).length>0) 
          {
             
              const unsaved=await axios.post(`/api/jobs/unsaveJob/${job._id}`,job,{headers})
              if(unsaved)
              {
                getJob()
              }
              
          }
          else
          {
             const saved=await axios.post(`/api/jobs/saveJob/${job._id}`,job,{headers})
              if(saved)
              {
                 getJob()
              }               
                 
    
          } 
      } catch (error) {
          console.log(error)
          
      }
    
    }
    const handleApply=async(e)=>{
      e.preventDefault()
      try {
        const response=await axios.get(`/api/jobs/candidate/${job._id}`,{headers})
         if (response.status === 200 || response.status === 201) {
            
              getJob()
              
            } else {
              alert('Something went wrong!');
            }
                
      } catch (error) {
        console.log(error)
        
      }

    }
   
    useEffect(()=>{
       
        getJob()
      

    },[])
    const styles = {
  scrollContainer: {
    
    width: "100%",
    height: "100vh",
    overflow:'auto',
    whiteSpace: "pre-wrap"
    
  
  
  },
}
  
  return (
   
    <div className='container'>
       { job ? <div className="card mb-1 border-0" >
               
                <div   className="card-header pt-0 px-0" >
                        {loading && <div>Loading ...</div>}
                        { (<img src={`${job.imageUrl}`}  className="img-fluid" style={{ width: '100%'}} />)}
                           <h5 className=' text-primary px-1  text-center' > {job.title}</h5>
                        <button className='btn ' data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                       <div className="d-flex justify-content-center">
                        <p className='p-0 m-0 text-center'>{job.companyName}</p> 
                        <span>|</span>
                        <p className='p-0 m-0 text-center text-danger'><FaLocationDot /></p>
                        <p className='p-0 m-0 text-center'>{job.location}</p>

                       </div>
                </div>
                <div className="card-body  f"  >
                     <h4>Vertrag & Arbeitszeiten</h4>
                        <ul>
                          <li>
                            <ul>
                              
                              {(job.work.map((item,index)=><li key={index} className='list-group-item'>{item}</li>))}
                            </ul>
                          </li>
                          <li>{job.type }</li>
                          <li><strong>Arbeitstage: </strong>{(job.workingdays.map((day,index)=>day+(index+1<job.workingdays.length ? ', ':'')))}</li>
                        </ul>
                     <h3>Leistungen</h3> 
                      <ul>
                        {(job.performances.map(performance=>
                        <li>{performance}</li>

                        ))}
                      </ul>  
                     <h3>Vollständige Stellenbeschreibung</h3>                    
                    <p className="card-text  lh-lg" >{job.description} </p>
                    <h3>Aufgaben</h3>  
                    <ol>
                       {(job.tasks.map((task)=><li className=''>{task}</li>))}
                    </ol>  
                    <h3>Fähigkeiten</h3>  
                    <ol>
                       {(job.skills.map((skill)=><li className=''>{skill}</li>))}
                    </ol>      
                    <h3>Sprachen</h3>  
                    <ol>
                       {(job.languages.map((language)=><li className=''>{language}</li>))}
                    </ol>
                    <ul className='p-0'>
                      <h3>Adresse</h3>
                      <li  className='list-group-item'>{job.adresse.city}</li>
                      <li className='list-group-item'>{job.adresse.street}</li>
                      <li className='list-group-item'>{job.adresse.hausNumber}</li>
                      </ul>               
                   
                    Salary: <span className='text-muted fs-6'>{job.salary.amount}</span>
                    <p className='text-muted fst-italic '> posted by : {job.user?.username}</p> 
                   
                </div>
                <div className="card-footer  row text-primary ">
                    <div className="col-12 d-flex justify-content-between">
                      <div className=' '> <Comment job={job} /> </div>
                    <div className=' '>
                        {job.savedJobList?.length } <button className={job.savedJobList?.some(saved=>saved.userId===user?._id) ? 'btn btn-primary' : 'btn btn-secondary ' } onClick={()=>saveunsaveJob(job)}><FaStore /></button>
                        {job.likes.length }  <button className={job.likes.some(like=>like.userId===user?._id) ? 'btn btn-primary' : 'btn btn-secondary '} onClick={()=>givePullLike(job)}>   <BiSolidLike /></button>

                    </div>
                    </div>
                     <div className='col-12   col-md-4 my-1 '>
                      <button className='btn btn-primary w-100' disabled={job.candidateList?.some(candidate=>candidate===user?._id) ? true:false} onClick={handleApply}>ich bin interessiert</button>
                    </div>
                  
               </div>
         </div>:<></>}
         
    </div>
  
  )


}

export default GetJob

