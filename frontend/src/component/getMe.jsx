import React, { useState ,useEffect,useRef} from 'react'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'



import {Link,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaEdit ,FaTrash} from 'react-icons/fa'
import axios from 'axios'
import {format} from 'date-fns'



const GetMe = () => {
  const { user } = useSelector((state) => state.auth)
 const pdfRef = useRef()
 const elementRef = useRef()

   const headers={            
            Authorization:`Bearer ${user.token}`
        }
  const [task,setTask]=useState('')
  const [technology,setTechnology]=useState('')
  const [careerData,setCareerData]=useState({
    start:null,
    end:null,
    companyName:'',
    description:'',
    tasks:[]
  })
  const [editCareer,setEditCareer]=useState(false)
  const [editEducation,setEditEducation]=useState(false)
  const [editSkills,setEditSkills]=useState(false)
  const [editProjects,setEditProjects]=useState(false)
  const [education,setEducation]=useState({
    start:null,
    end:null,
    institute:'',
    description:'',
  })
  const [skill,setSkill]=useState({
    name:'',
    level:''
  })
  const [project,setProject]=useState({
    name:'',
    description:'',
    technologies:[],
    link:''

  })
  const [profile,setProfile]=useState(null)
 
 
  const handleAddTask=(e)=>{
    e.preventDefault()
    setCareerData((prev)=>({
      ...prev,
      tasks: task.trim()!=='' ? [...prev.tasks, task]:[...prev.tasks],
    }))
    setTask('')
   
  }
  const handleEnterDown=(e)=>{
    if(e.key==='Enter')
    {
      handleAddTask(e)
    }
  }
  const updateProfile=async(e)=>{
   
    
     e.preventDefault()
    try {
     
      
        const response=await axios.put(`/api/profile/careerhistory/${profile._id}`,careerData,{headers})
        if(!response){console.log('error')}
        else{
          getprofile()
          setCareerData({
            start:null,
            end:null,
            companyName:'',
            description:'',
            tasks:[]

          })
          setEditCareer(false)
        }
          

    } catch (error) {
      console.log(error)
      
    }


  }
  const deleteOneCareer=async(index)=>{
   
    const response=await axios.delete(`/api/profile/careerhistory/${profile._id}/${index}`,{headers})
    if(!response)
    {
      console.log('Error')
    }
    else{
      console.log(response.data)
      getprofile()
    }

  }
   
   const getprofile=async()=>{
    try {
      const response=await axios.get(`/api/profile/${user?.profile?._id}`,{headers})
      if(!response)
      {
        console.log('Error in get Profil')
      }
     
      console.log('response.data',response.data)
      setProfile(response.data.profile)

      
    } catch (error) {
      console.log('Error fetching profile:', error)
      
    }

   }
   const updateEduction=async(e)=>{
     e.preventDefault()
    try {
     
      
        const response=await axios.put(`/api/profile/education/${user?.profile?._id}`,education,{headers})
        if(!response){console.log('error')}
        else{
          getprofile()
        }
          

    } catch (error) {
      console.log(error)
      
    }

   }
   const deleteOneeducation=async(index)=>{
    try {
      const response=await axios.delete(`/api/profile/education/${profile._id}/${index}`,{headers})
    if(!response)
    {
      console.log('Error')
    }
    else{
      console.log(response.data)
      getprofile()
    }
      
    } catch (error) {
      
    }

   }
   const addSkill=async(e)=>{
     e.preventDefault()
    try {
         const response=await axios.put(`/api/profile/skills/${profile._id}`,skill,{headers})
         if(!response.data)
         {
          console.log('Error ')
         }
       getprofile()
       setSkill(()=>({
        name:'',
        level:''
       }))
    } catch (error) {
      console.log(error)
      
    }
    

   }
    const deleteOneSkill=async(index)=>{
    try {
      const response=await axios.delete(`/api/profile/skills/${profile._id}/${index}`,{headers})
    if(!response)
    {
      console.log('Error')
    }
    else{
      console.log(response.data)
      getprofile()
    }
      
    } catch (error) {
      console.log(error)
      
    }

   }
   const addProject=async(e)=>
   {
    
     e.preventDefault()
    try {
         const response=await axios.put(`/api/profile/projects/${profile._id}`,project,{headers})
         if(!response.data)
         {
          console.log('Error ')
         }
       getprofile()
       setProject(()=>({
        name:'',
        description:'',
        link:'',
        technologies:[]
       }))
    } catch (error) {
      console.log(error)
      
    }
    
   }
   const handleAddProjectTechnology=(e)=>{
    e.preventDefault()
    setProject((prev)=>({
      ...prev,
      technologies: technology.trim()!=='' ? [...prev.technologies, technology]:[...prev.technologies],
    }))
    setTechnology('')

   }
   const deleteOneProject=async(index)=>{
    try {
      const response=await axios.delete(`/api/profile/projects/${profile._id}/${index}`,{headers})
    if(!response)
    {
      console.log('Error')
    }
    else{
      console.log(response.data)
      getprofile()
    }
      
    } catch (error) {
      console.log(error)
      
    }

   }
const handleDownloadPDF = () => {
  const elementToHide = document.querySelectorAll('.noPDF')
  elementToHide.forEach(el => el.style.display = 'none')
  const input = pdfRef.current
 html2pdf().set({
        margin: [5, 0, 1, 0],
        filename: 'my-pdf.pdf',
        html2canvas: { scale: 4 , useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(input).save('my-pdf.pdf').then(() => {
    // Restore visibility after PDF generation
    elementToHide.forEach(el => (el.style.display = ''))
  })
     
   
  
}


useEffect(()=>{
    getprofile()
   
   

  },[])
   const Style={
    backgroundColor:{
      backgroundColor:'rgb(242, 244, 247)',
      color:'black',
     
    },
    h4style:{
      backgroundColor:'rgb(242, 244, 247)' ,
      color:'black',
      borderTopRightRadius:'10px',
      
       padding: '5px'
       

    },
    h5style:{
      backgroundColor:'rgb(242, 244, 247)' ,
      color:'black',
      borderTopRightRadius:'10px',
       borderBottomRightRadius:'10px',
       padding: '5px'
       

    },
    fontStyle:{

       fontSize: '15px'

    }
    
  }
  return (
    <div className='bg-light' >
            <div className="container py-3 px-0" ref={pdfRef} style={Style.fontStyle}>
              
            <div className="row p-0 m-0">
              <div className="col-4 m-0   text-center" style={Style.backgroundColor}>
                <div className='py-2'>
                     <img src='/images/Bild1.jpg' className='img-fluid m-auto rounded ' style={{height:'250px',width:'200px'}} />
                     <p className='my-1  '><strong>Ahmad Al Asaf</strong></p>
                </div>
                <div className='py-3 '>
                 
                  <p className='m-0'>eng.ahmad.alassaf@gmail.com</p>
                  <p className='m-0'>Tel: +4915175614666</p>
                   <p className='m-0'>WhatsApp: +4915175614666</p>
                </div>
                <div className=' py-3'>
                  <h3>Persönliche Daten</h3>
                  <p  className='m-0'>25.02.1984 in Aleppo/Syrien</p>
                  <p className='m-0'>verheiratet </p>
                  <p className='m-0'> Syrisch/Deutsch</p>
                </div>
                <div className=' py-3'>
                  <h3>Sprachkenntnisse</h3>
                  <p  className='m-0'>Deutsch( gut in Wort und Schrift</p>
                  <p className='m-0'>Englisch (gut)</p>
                  <p className='m-0'> Arabisch (Mutter Sprache)</p>
                </div>
                <div>
                  <button className='btn btn-primary w-100 noPDF'><FaEdit /></button>
                </div>
                

              </div>
              <div className="col-8 p-0 m-0 ">
                <div> 
                  
                  <h4 className=' text-center   m-0' style={Style.h4style}>Fullstack Developer/Webentwickler</h4>

                </div>
                
                <h4 className='px-1 text-center mt-1' ><strong>Beruflicher Werdegang</strong></h4>
                <div>
                     {profile?.careerHistory?.length >0 &&(profile?.careerHistory?.map((item,index)=>
                     <div key={index} className=' px-1 d-flex  align-items-center  mb-1  border-bottom'>
                      <div className="  w-100 px-1">
                          
                            <p className='text-muted p-0 m-0'> {format(item.start,'MMMM yyyy')} - {format(item.end,'MMMM yyyy')}</p>
                             <h5 className=' d-inline-block' style={Style.h5style} >{item.companyName}</h5>
                            <ul className=''>
                              {item.tasks?.length>0 &&(item.tasks?.map((item,index)=>(<li key={index} className=''>{item}</li>)))}
                            </ul>
                           
                            <p style={Style.fontStyle}>{item.description}</p>
                      </div>
                      <div>
                       {editCareer &&(<button className='btn btn-danger' onClick={(e)=>deleteOneCareer(index)}> <FaTrash /> </button>)} 
                      </div>
                           
                     </div>))}
                     {!editCareer &&(<span className='text-primary p-2 noPDF'  onClick={()=>setEditCareer(true)}><FaEdit /></span>)}
                </div>
                {editCareer &&(
                <form  className='form py-3 border rounded shadow px-1 w-50 m-auto' onSubmit={updateProfile}>
                   <button className='btn-close float-end border  bg-danger' onClick={()=>setEditCareer(false)} />
                  <div className='py-2'>
                    <label htmlFor="startdate" className="form-label ">Start</label>
                    <input type="date" name="startdate"  id='startdate'  className='form-control '
                    value={careerData.start}
                      onChange={(e) =>
                        setCareerData((prev) => ({ ...prev, start: e.target.value }))
                      }
                      min="1980-01-01"  max="2025-12-31" />
                  </div>
                   <div className=''>
                        <label htmlFor="endtdate" className="form-label">End</label>
                        <input type="date" name="endtdate"  id='endtdate' className='form-control '
                            value={careerData.end}
                          onChange={(e) =>
                            setCareerData((prev) => ({ ...prev, end: e.target.value }))
                          }
                          min="1980-01-01"    max="2025-12-31" />
                  </div>
                  <div className='input-group my-1'>
                     <input type="text" name='companyName' value={careerData.companyName} className='form-control' placeholder='company name...' 
                     onChange={(e)=>setCareerData((prev)=>({...prev,companyName:e.target.value}))}
                     />

                  </div>
                   <div className='input-group my-1'>
                     <input type="text" name='task' value={task} className='form-control' onChange={(e)=>setTask(e.target.value)} onKeyDown={handleEnterDown} placeholder='Aufgaben...' />
                     
                     <button className='btn btn-primary ' onClick={handleAddTask}>+</button>
                  </div>
                  
                  <ol>
                     {careerData?.tasks?.length>0 && ( careerData.tasks.map((task,index)=>(<li key={index}>{task}</li>))) }
                  </ol>
                  <div>
                    <textarea className='form-control' name='description' value={careerData.description} onChange={(e)=>setCareerData((prev)=>({...prev,description:e.target.value}))} />
                  </div>
                   <button className='btn btn-primary w-100 my-1' type='submit'>Speichern</button>
                               
                   
                </form>
                )}
                  <h4 className='px-1 text-center' ><strong>Bildung</strong></h4>
                  {profile?.education.length>0 && (profile?.education?.map((item,index)=>(
                       <div key={index} className=' mx-1 my-0 d-flex justify-content-between align-items-center border-bottom'>
                        <div className=" mx-1">
                           <h5 className=' d-inline-block' style={Style.h5style}>{item.institute}</h5>
                           <p className='mx-1 my-0'>{format(item.start,'MMMM yyyy')}- {format(item.end,'MMMM yyyy')}</p>
                           <p className='mx-1 my-0'>{item.description}</p>

                        </div>
                        {editEducation && ( <button className='btn btn-danger' onClick={(e)=>{deleteOneeducation(index)}}><FaTrash /></button>)}
                          
                       </div>)))}
                   {!editEducation &&(<span className='text-primary p-2 noPDF'  onClick={()=>setEditEducation(true)}><FaEdit /></span>)}
                  {editEducation && (
                  <form  className='form py-2 w-50 m-auto shadow px-1 border rounded my-1' onSubmit={updateEduction}>
                       <button className='btn-close float-end border  bg-danger' onClick={()=>setEditEducation(false)} />
                  <div className='py-3'>
                    <label htmlFor="startdate" className="form-label ">Start</label>
                    <input type="date" name="startdate"  id='startdate'  className='form-control '
                    value={education.start}
                      onChange={(e) =>
                        setEducation((prev) => ({ ...prev, start: e.target.value }))
                      }
                      min="1980-01-01"  max="2025-12-31" />
                  </div>
                   <div className=''>
                        <label htmlFor="endtdate" className="form-label">End</label>
                        <input type="date" name="endtdate"  id='endtdate' className='form-control '
                            value={education.end}
                          onChange={(e) =>
                            setEducation((prev) => ({ ...prev, end: e.target.value }))
                          }
                          min="1980-01-01"    max="2025-12-31" />
                  </div>
                  <div className='input-group my-1'>
                     <input type="text" name='companyName' value={education.institute} className='form-control' placeholder='institute...' 
                     onChange={(e)=>setEducation((prev)=>({...prev,institute:e.target.value}))}
                     />

                  </div>
                
                  <div>
                    <textarea className='form-control' name='description' value={education.description} onChange={(e)=>setEducation((prev)=>({...prev,description:e.target.value}))} />
                  </div>
                  <button className='btn btn-primary w-100 my-1' type='submit'>Speichern</button>
                </form>
                )}
                <h4 className='text-center ' ><strong>Technologie Kenntnisse</strong> </h4>
                <ul>
                    {profile?.skills.length>0 &&(profile?.skills.map((item,index)=>(
                      
                        <li key={index} className=' mx-1 my-0  d-flex justify-content-between align-items-center rounded '>
                            <div className=' w-100'>
                                  <div className=''>{item.name} </div> 
                                  <p className='px-3 py-0 m-0 text-muted my-0  '>{item.level}</p>
                          </div>
                        {editSkills &&(  <button className='btn btn-danger' onClick={()=>deleteOneSkill(index)}><FaTrash/></button>)}
                        </li>
                    
                    )))}
                </ul>
                  {!editSkills &&(<span className='text-primary p-2 noPDF' onClick={()=>setEditSkills(true)}><FaEdit /></span>)}
                {editSkills && (
                 <form onSubmit={addSkill} className='form w-50 m-auto py-2 my-1 border rounded shadow'>
                     <button className='btn-close float-end bg-danger' onClick={()=>setEditSkills(false)} />
                      <div className='py-3 px-1 '>
                        <input type='text ' className='form-control' placeholder='Skill..' name='name' value={skill.name} onChange={(e)=>setSkill((prev)=>({...prev,name:e.target.value}))} />
                        <textarea className='form-control my-1' placeholder='Level or description' name='level' value={skill.level} onChange={(e)=>setSkill((prev)=>({...prev,level:e.target.value}))} />
                        <button type='submit' className='btn btn-primary w-100 my-1'>Add</button>

                      </div>
                    
                 </form>
                 )}
                  
                  <h4 className='text-center ' ><strong>Projects</strong></h4>
                <ul>
                    {profile?.projects.length>0 &&(profile?.projects.map((item,index)=>(
                      
                        <li key={index} className=' m-1  d-flex justify-content-between align-items-center rounded '>
                              
                            <div className=' '>
                                 <h5 className=' d-inline-block' style={Style.h5style}>{item.name} </h5>
                                  <p className='py-0 my-0'>
                                    <a  href={item.link}  target="_blank"   rel="noopener noreferrer"  className="px-1 text-primary" >{item.link} </a>
                                     </p> 
                                  {item.technologies.length>0 &&(item.technologies.map((item,index)=>(
                                    <span key={index} className=' rounded px-1 mx-1'>{item}</span>)))}
                                  
                                  <p className='px-1 text-muted'>{item.description}</p>
                          </div>
                        {editProjects &&(<button className='btn btn-danger ' onClick={()=>deleteOneProject(index)}><FaTrash/></button>)}  
                        </li>
                    
                    )))}
                </ul>
                {!editProjects &&(<span className='text-primary p-2 noPDF'  onClick={()=>setEditProjects(true)}><FaEdit /></span>)}
                {editProjects &&(
                 <form onSubmit={addProject} className='form w-50 m-auto py-2 border px-1 rounded shadow'>
                    <button className='btn-close float-end bg-danger ' onClick={()=>setEditProjects(false)}/>
                    <input type='text ' className='form-control my-1' placeholder='name...' name='name' value={project.name} onChange={(e)=>setProject((prev)=>({...prev,name:e.target.value}))} />
                    <input type='text ' className='form-control my-1' placeholder='link...' name='link' value={project.link} onChange={(e)=>setProject((prev)=>({...prev,link:e.target.value}))} />
                    <div className='input-group'>
                       <input type='text ' className='form-control' placeholder='technology...' name='technology' value={technology} onChange={(e)=>setTechnology(e.target.value)} />
                       <button className='btn btn-primary' onClick={handleAddProjectTechnology}>+</button>
                    </div>
                     <ul className=''>
                              {project.technologies?.length>0 &&(project.technologies?.map((item,index)=>(<li key={index} className=''>{item}</li>)))}
                    </ul>
                    <textarea className='form-control my-1' placeholder='description' name='description' value={project.description} onChange={(e)=>setProject((prev)=>({...prev,description:e.target.value}))} />
                    <button type='submit' className='btn btn-primary w-100'>Add</button>
                 </form>
                 )}
              </div>
            </div>
              <button  className='btn btn-success my-2 noPDF' onClick={handleDownloadPDF}>
                  Download as PDF
                </button>
            </div>
    </div>
  )
}

export default GetMe
