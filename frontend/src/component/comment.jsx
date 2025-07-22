import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import TimeAgo from './timeAgo'

const Comment = ({job}) => {
      const {user}=useSelector((state)=>state.auth)
      const [comments,setComments]=useState([])
            const [addComment,setAddComment]=useState('')
             const [showComments,setShowComments]=useState(false)
    const [commentForm,setCommentForm]=useState({
        text:'',
       
    })
  
    const handleOnChange=(e)=>{
        e.preventDefault()
        setCommentForm({
            ...commentForm,
            [e.target.name]:e.target.value

        })
    }
    const handleSubmit=async(e)=>{
       
        e.preventDefault()
        const headers={
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.token}`
        }
        try {
            const response=await axios.post(`/api/comments/${job._id}`,commentForm,{headers})
            if(response.data){
                getComments()
                
                
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const getComments=async()=>{    
        try {
            const response=await axios.get(`/api/comments/${job._id}`)           
            if(response){
                setComments( response.data)
                setCommentForm({
                    ['text']:''
                })
            }
            
        } catch (error) {
            console.log(error)            
        }
    }
    
    useEffect(()=>{
        getComments()       
       
    },[job._id])
  return (
    <div>
       
       
        
        <span className='text-primary text-decoration-underline' style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">{comments.length} comments</span>

          
       <div className="modal fade" id="staticBackdrop"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Comments</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                        <form onSubmit={handleSubmit} className='d-flex'>
                                <div className='input-group my-1'>
                                <input type='text' name='text' value={commentForm.text} onChange={handleOnChange}  className='form-control' placeholder='send comment...'/>
                                <button type='submit' className='btn btn-primary' >send</button>

                                </div>
                        
                    </form>
          
                        {comments.map((item)=>(
                        <div key={item.id} className='px-2 text-dark  rounded-5 my-1'>
                            <p className='my-0 text-primary'>{item.user.username}:</p>
                            <p className='fs-6 p-0 m-0 text-muted'><TimeAgo timestamp={item.createdAt} /></p> 
                            <p className='my-0 bg-light px-5'>{item.text}</p>
                            
                        </div>))} 
                       
                
            </div>
           
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default Comment
