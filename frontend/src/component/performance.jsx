import React, { useState,useEffect } from 'react'

const Performance = ({getPerformances,initialperformances}) => {
    
  
    const [performance, setPerformance]=useState('')

    const [performancesList, setPerformancesList]=useState([])
    const [addPerformanceError,setAddPerformanceError]=useState(null)
    const [hovered, setHovered] = useState(null)
   
    const handleOnChange=(e)=>{
        setPerformance(e.target.value)
    }
    const handleAddPerformance=(e)=>{
        e.preventDefault()
       
        setPerformancesList((prev)=>[...prev,performance] )
        setAddPerformanceError(null)
        setPerformance('')
    }
    const deletePerformance=(e,performanceToDelete)=>{
        e.preventDefault()
        setPerformancesList((prev)=>prev.filter(item=>item !==performanceToDelete))
       
    }
    const Style={
        textBreak :{
            wordWrap: 'break-word',
            overflowWrap : 'break-word',
            wordWreak : 'break-word',
            whiteSpace: 'normal',
          },
    }
    useEffect(()=>{
        if(initialperformances && performancesList.length===0)
            setPerformancesList(initialperformances)
     
       
        getPerformances('performances',performancesList)
    },[initialperformances,performancesList])
   
  return (
    <div className=''>
        <div className="input-group">
            <input type="text" name="performance" value={performance} onChange={handleOnChange} className='form-control' placeholder='Firmenleistungs oder Events...'/>
            <button className='btn btn-primary' onClick={ handleAddPerformance}>+</button>
        </div>
        {(<p className='text-danger m-0 fst-italic'>{addPerformanceError}</p>)}        
            <ul className=' shadow  rounded mt-1 mx-4 p-0'>           
            {performancesList && (performancesList.map((performance,index)=> (
                <li key={index} className='   d-flex justify-content-between px-2    bg-white' 
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)} 
                            style={{
                                cursor: 'pointer',
                                backgroundColor: hovered === index ? '#f0f0f0' : 'transparent',
                                color: hovered === index ? '#007bff' : '#000',
                                transition: 'all 0.3s ease',
                            }}  >
                          <div className="d-flex  p-0" >
                             <span className='mx-1 ' style={{fontSize:'18px'}}>&#10063;</span>
                             <p className=' text-start fs-5 py-0 px-1  m-0 ' style={Style.textBreak}> {performance} </p>
                          </div>
                          <div className="  p-0  position-relative">
                                 <button className=' btn-close position-absolute top-0 end-0 ' onClick={(e)=>deletePerformance(e,performance)}/>
                          </div>                         
                                     
                </li>) ))}
                </ul>
      
    </div>
  )
}

export default Performance
