import React, { useState,useEffect } from 'react'
import {FaTrash} from 'react-icons/fa6'

const Tasks = ({getTasks,initialtasks}) => {
    const [task,setTask]=useState('')
    const [addTaskError,setAddTaskError]=useState(null)
    const [tasksList,setTasksList]=useState(()=>initialtasks ? initialtasks:[])
     const [hovered, setHovered] = useState(null);
    const handleTaskOnChange=(e)=>{
        
        setTask(e.target.value)
    }
    const handleAddTask=(e)=>{
       e.preventDefault()
        if(task.trim()!=='' ){
            setTasksList((prev) => [...prev, task]) // Add new task to the tasks array
            setTask('') 
            getTasks(tasksList)
            setAddTaskError(null)
        }
        else{setAddTaskError('Task cann not be empty')}          
    }
    const deleteTask=(e,taskToDelete)=>{
        e.preventDefault()
        setTasksList((prev)=>prev.filter(item=>item !==taskToDelete))
        getTasks(tasksList)

    }
    const Style={
        textBreak :{
            wordWrap: 'break-word',
            overflowWrap : 'break-word',
            wordWreak : 'break-word',
            whiteSpace: 'normal',
          }
    }
        useEffect(()=>{
            if(initialtasks && tasksList.length===0)
                setTasksList(initialtasks)
          getTasks('tasks',tasksList)
        },[initialtasks,tasksList])
    
  return (
    <div>
         <div  className='input-group'>
            <input type='text'  value={task} name='task' placeholder='Aufgaben'   onChange={handleTaskOnChange} className='form-control overflow-x-scroll'/>            
            <button type='' className='btn btn-primary' onClick={handleAddTask}>+</button>
         </div>
        {addTaskError &&(<p className='text-danger m-0 fst-italic'>{addTaskError}</p>)}        
        <ul className=' shadow  rounded mt-1 mx-4 p-0'>
            {tasksList?.length>0 && (tasksList.map((task,index)=> (
                <li key={index} className='d-flex justify-content-between px-2    bg-white '
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)} 
                style={{
                    cursor: 'pointer',
                    backgroundColor: hovered === index ? '#f0f0f0' : 'transparent',
                    color: hovered === index ? '#007bff' : '#000',
                    transition: 'all 0.3s ease',
                }} 
                >
                   
                          <div className="d-flex" >
                             <span className='mx-1 ' style={{fontSize:'18px'}}>&#10063;</span>
                             <p className=' text-start px-2 m-0 fs-5 ' style={Style.textBreak}>{task} </p>
                         </div>
                          <div className="">
                                 <button className=' btn-close  ' onClick={(e)=>deleteTask(e,task)}/>
                          </div>                         
                                     
                </li>) ))}
        </ul>
       
      
    </div>
  )
}

export default Tasks
