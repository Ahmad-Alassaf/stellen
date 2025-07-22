import React, { useState,useEffect } from 'react'

const UseScreenScrolling = () => {
    const [height,setHeight]=useState(30)
    const Style={
        navStyle:{

        }
    }
    useEffect(() => {
        const checkHeight = () => {
          const height = window.innerHeight;
          setHeight(height)
         
          if (height > 30) {
          }
           else{

           }
        };
    
        checkHeight(); // run on load
        window.addEventListener("scroll", checkHeight);
    
        
      }, [])
  return (
    <div>
      
    </div>
  )
}

export default UseScreenScrolling
