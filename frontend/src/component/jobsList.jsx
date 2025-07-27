import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { FaTrash ,FaEdit    } from 'react-icons/fa'
import {   BiSolidLike } from 'react-icons/bi'
import NewJob from './newJob'
import Comment from './comment'
import ReadMoreLess from './readMoreLess'


const JobsList = () => {
    const [jobs,setJobs]=useState([])
    const [limit,setLimit]=useState(5)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [addedJob,setAddedJob]=useState(false)
    const [addComment,setAddComment]=useState('')
    const [comment,setComment]=useState(false)
    const[neweditflage,setNewEditFlage]=useState('new')
    const {user}=useSelector((state)=>state.auth)
     const navigate = useNavigate()
    const headers={
        "Content-Type":"application/json",
        Authorization:`Bearer ${user.token}`
    }
    const getAllMyJobs=async()=>{
        try {
            const jobsList=await axios.get(`/api/jobs/myjobs/${limit}/${currentPage}`,{headers})
            if(jobsList){
               console.log('JobsList:')
               console.log(jobsList.data)
                setJobs( jobsList.data.jobs)
                setCurrentPage(jobsList.data.currentPage)
                setTotalPages(jobsList.data.totalPages)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleOnDelete=async(id)=>{
        try {
            const deleted=await axios.delete(`/api/jobs/${id}`,{headers})
            if(deleted){
                getAllMyJobs()
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleNewEdit=(jobToEdit,value)=>{// value is new or edit string

       if(jobToEdit && value==='edit')
       {
        navigate(`/neweditjob/${jobToEdit._id}`)
       }
       else
       navigate(`/neweditjob`)
    }
    const toggleNewJob=(prev)=>{
        setAddedJob(!prev)
    }
    const [likeColor,setLikeColor]=useState('btn-secondary')
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
            getAllMyJobs()

        } catch (error) {
            console.log(error)

        }

    }
    const toggleComment=(id)=>{

        setAddComment(id)
        setComment( prev => !prev)
    }
    const checkIfAdded=(value)=>{
        console.log('Check if added function called and value:')
        console.log(value)
       if(value)
          getAllMyJobs()
    }
    const handleLimitChange=(e)=>{
        setLimit(e.target.value)

    }
    useEffect(()=>{
        getAllMyJobs()

    },[user,limit,currentPage])
  return (
    <div className='container my-1 '>
        <button className='btn btn-primary '
                type='button'
                onClick={()=>handleNewEdit(null,'new')}
                >New
       </button>
        <select className='form-select w-auto my-1' onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
       {jobs?.length>0 && jobs.map((job)=>(
         <div className="card mb-1" key={job._id}>
                <div className="card-header p-0">
                    <div>
                       <img src={`${job.imageUrl}`} className="" style={{ width: '100%'}}/>
                       {job.imageUrl}
                    </div>
                    <div className=" ">
                        <div className='  '>
                            <h5 className='text-primary px-1 text-decoration-underline text-center'> {job.title}</h5>
                        <p className='p-0 m-0 text-center'>{job.location}</p>
                        </div>
                    </div>
                </div>
                <div className="card-body  f" style={{ whiteSpace: "pre-wrap"}}>
                    <p className="card-text  lh-lg" ><ReadMoreLess text={job.description} maxLength={500} /> </p>
                    Salary: <span className='text-muted fs-6'>{job.salary.amount}</span>
                    <p className='text-muted fst-italic '> posted by : {job.user.username}</p> 
                    <span className='text-primary ' style={{cursor: 'pointer'}} onClick={()=>toggleComment(job._id)}>comments</span>
                    { (addComment===job._id) && <Comment job={job} />}

                </div>
                <div className="card-footer  text-end text-primary">
                <button className="btn btn-info  mx-2"  onClick={()=>handleNewEdit(job,'edit')}><FaEdit /></button>
                <button className="btn btn-danger  mx-2"  onClick={()=>handleOnDelete(job._id)}><FaTrash /></button>
                </div>
         </div>

       ))

       }
       <div className='d-flex d-flex  justify-content-center align-items-center py-1'>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
          disabled={currentPage === 1} className='btn '> &#9665;</button>
          <span className=''> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
          disabled={currentPage === totalPages} className='btn '> &#9655;</button>

          </div>
    </div>
  )
}

export default JobsList
