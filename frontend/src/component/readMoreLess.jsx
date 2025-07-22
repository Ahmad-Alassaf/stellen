import React, { useState } from 'react'

const ReadMoreLess = ({text,maxLength=50}) => {
    const [isExpanded,setIsExpanded]=useState(false)
    const toggleReadMore=()=>{
        setIsExpanded(!isExpanded)
    }
  return (
    <div>
       
      
        {isExpanded ? <>{text}<span onClick={toggleReadMore} className='text-primary text-decoration-underline' style={{cursor:"pointer"}}>.weniger...</span></>:
        <>{text.slice(0, maxLength)}<span style={{cursor:"pointer"}} onClick={toggleReadMore} className='text-primary text-decoration-underline'>.mehr...</span></> }
     
     
    </div>
  )
}

export default ReadMoreLess
