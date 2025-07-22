import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RecomededJobs = () => {
    const {user}=useSelector((state)=>state.auth)
   
    const [recomendedList,setRecomededList]=useState([])
    const getRecomendedJobs=async()=>{
        try{
                const headers={            
                            Authorization:`Bearer ${user.token}`
                        }
            const response= await axios.get(`/api/jobs/recomendedjobs/${user.profile._id}`,{headers})
            if(!response){}
            else{
                console.log('response.data',response.data)
                setRecomededList(response.data)
            }

        }
        catch(erreor){console.log(erreor)}
    }
    useEffect(()=>{
        if(user.token)
        {
           getRecomendedJobs()
        }
          

    },[])
  return recomendedList
}

export default RecomededJobs
