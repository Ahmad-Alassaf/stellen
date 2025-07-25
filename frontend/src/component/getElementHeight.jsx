import React, { useEffect, useState } from 'react'

const GetElementHeight = ({elementId}) => {
    const [height,setHeight]=useState(0)
    const getHeight=(id)=>{
        const element=document.getElementById("id")
        const height=element.height
        setHeight(height)

    }
    useEffect(()=>{
        getHeight(elementId)
    },[elementId])
  return height
}

export default GetElementHeight
