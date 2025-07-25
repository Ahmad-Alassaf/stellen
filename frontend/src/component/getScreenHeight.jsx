import React, { useEffect, useState } from 'react'

const GetScreenHeight = () => {
    const[height,setHeight]=useState(0)
    const getHeight=()=>{
        const height=window.innerHeight
        setHeight(height)
    }
    useEffect(()=>{
        getHeight()
    },[])
  return height
}

export default GetScreenHeight
