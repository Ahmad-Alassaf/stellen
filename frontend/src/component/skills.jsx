import React, { useState ,useEffect} from 'react'
import { initializeConnect } from 'react-redux/es/components/connect'

const Skills = ({getSkills,initialSkills}) => {
    const [skill,setSkill]=useState('')
    const [addSkillError,setAddSkillError]=useState(null)
    const [skillsList,setSkillsList]=useState(()=>initialSkills ? initialSkills :[])
      const [hovered, setHovered] = useState(null);
      const [isHovered, setIsHovered] = useState(null);
  
    const handleSkillOnChange=(e)=>{ 
          if(e.target.value.trim()!=='')      
            setSkill(e.target.value)
           
    }
    const handleAddSkill=(e)=>{
        e.preventDefault() 
        if(skill.trim()!=='' ){
            
            setSkillsList((prev) => [...prev,skill]) // Add new skill to the array
            setSkill('') 
          
            setAddSkillError(null)
        }
        else{setAddSkillError('Skill cann not be empty or longer als 80')}          
    }
    const deleteSkill=(e,skillToDelete)=>{
        e.preventDefault()
        setSkillsList((prev)=>prev.filter(item=>item !==skillToDelete))
       

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' ) { // If the Enter key is pressed
            handleAddSkill(e); // Call the addSkill function
        }
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
        if(initialSkills && skillsList.length===0)
            setSkillsList(initialSkills)
        getSkills('skills',skillsList)
      },[initialSkills,skillsList])
  return (
    <div>
         <div  className='input-group'>
          <input type='text ' value={skill} name='skill' placeholder='Fähigkeiten' onKeyDown={handleKeyDown}   onChange={handleSkillOnChange} className='form-control'/>
        
          <button type='' className='btn btn-primary' onClick={handleAddSkill}>+</button>

         </div>
      
         {addSkillError &&(<p className='text-danger m-0 fst-italic'>{addSkillError}</p>)}
        
        <ul className='shadow   mt-1 mx-4 p-0   '>
            {skillsList?.length>0 && (skillsList.map((skill,index)=> (
                <li key={index} className='d-flex justify-content-between    px-2  rounded  bg-white     '
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)} 
                        style={                                
                                {
                                    backgroundColor: hovered === index ? '#f0f0f0' : 'transparent',
                                    color: hovered === index ? '#007bff' : '#000',
                                    transition: 'all 0.3s ease',
                                }
                        } 
                        > 
                          <div className="d-flex" >
                             <span className='mx-1 ' style={{fontSize:'18px'}}>&#10063;</span>
                             <p className=' text-start px-2 m-0 fs-5 ' style={Style.textBreak}>{skill} </p>
                         </div>
                          <div className="">
                          <button className='btn  ' onClick={(e)=>deleteSkill(e,skill)} 
                                onMouseEnter={() => setIsHovered(index)}
                                    onMouseLeave={() => setIsHovered(null)}
                                    style={{

                                        color: isHovered===index ? 'red' : 'black',
                                        cursor: 'pointer',
                                    }}>X</button>
                          </div>             
                </li>) ))}

        </ul>
       
      
    </div>
  )
}

export default Skills
