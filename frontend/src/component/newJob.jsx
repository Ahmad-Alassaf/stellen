import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import  { Country, State, City } from 'country-state-city'
import {FaTimes} from 'react-icons/fa'
import ImageUpload from './ImageUpload '
import Tasks from './tasks'
import Skills from './skills'
import Languges from './languages'
import Performances from './performance'
import Adresse from './adresse'
import { useNavigate,useParams } from 'react-router-dom'
import { getCategories } from '../utilities/CategoryService'

const NewJob = () => {
    const {user}=useSelector((state)=>state.auth)

   const headers={            
            Authorization:`Bearer ${user?.token}`
        }
           const{id}=useParams()
           const navigate=useNavigate()
           const [jobToEdit,setJobToEdit]=useState(null)
         const[error, setError]=useState(null)
         const [categoriesList,setCategoriesList]=useState([])
        const [dataForm,setDataForm]=useState({
            title:'',
            category:'',
            companyName:'',
            description:'',
            type:[],//befristet, unbefristet
            work:[],
            workingdays:[],
            skills:[],
            tasks:[],
            languages:[],
            performances:[],
            salary: {
                type: '', // 'hourly' or 'monthly'
                amount: 0
              },
            location:'',
            adresse:{
                city:'',
                street:'',
                housNumber:''

            },
            imageURL:''
        
        })
       const  [hoveredIndex, setHoveredIndex] = useState(null)
        const [enteredIndex, setEnteredIndex] = useState(null);
        const [filteredCities, setFilteredCities] = useState([]);
        const germany = Country.getCountryByCode('DE');    
        const germanCities = City.getCitiesOfCountry(germany.isoCode);
        const [selectedCity, setSelectedCity] = useState(null)
        const [salaryType,setSalaryType]=useState('')  
        const [imagePath,setImagePath]=useState('') 
        const [image,setImage]=useState(null) 
     
     const getJobToEdit=async(id)=>{
       
        try {
            const response= await axios.get(`/api/jobs/job/${id}`,{headers})                   
                    if(response)
                    { 
                        console.log('getJobToEdit Function is called ') 
                         console.log('Job to edit',response.data) 
                       setJobToEdit(response.data) 
                        console.log('response.data.imageURL',response.data.imageURL)
                       setDataForm(response.data) 
                         
                        setError('') 
                               
                      
                    }
            
        } catch (error) {
            console.log(error)
            
        }

     }
    const handleOnSubmit=async(e)=>{       
             e.preventDefault()  
            console.log(error)
            const headers={   
               
                Authorization:`Bearer ${user?.token}`
            }
            try {  
                console.log('submittion new job and dataForm values:')
                console.log(dataForm)
                const formData = new FormData()
                formData.append('file',image)
                formData.append('title',dataForm.title)
                formData.append('category',dataForm.category)
                formData.append('companyName',dataForm.companyName)
                formData.append('description',dataForm.description)
                formData.append('type',JSON.stringify(dataForm.type))
                formData.append('work',JSON.stringify(dataForm.work))
                formData.append('workingdays',JSON.stringify(dataForm.workingdays))
                formData.append('skills',JSON.stringify(dataForm.skills))
                formData.append('tasks',JSON.stringify(dataForm.tasks))
                formData.append('languages',JSON.stringify(dataForm.languages))
                formData.append('performances',JSON.stringify(dataForm.performances))
                formData.append('salary', JSON.stringify(dataForm.salary))
                formData.append('location',dataForm.location)
                formData.append('adresse', JSON.stringify(dataForm.adresse))
                if(jobToEdit && id)
                {
                    // edit

                    console.log('editing......')
                    console.log(formData)
                    const response= await axios.put(`/api/jobs/${id}`,formData,{headers})                   
                    if(response)
                    {               
                        
                        setDataForm(response.data)                      
                        setError('')  
                        navigate('/jobslist')        
                      
                    }
                }
                else{
                    //create
                    const response= await axios.post(`/api/jobs`,formData,{headers})                   
                    if(response)
                    {               
                        
                        setDataForm(response.data)     
                        setError('')  
                        navigate('/jobslist')                
                      
                    }

                }
               
            } catch (err) {           
                console.log(err)
                setError(err)
               
            }
       
    }
    const handleMouseOver=(index)=>{
        setHoveredIndex(index)
     
      }
    const handleOnChange=(e)=>{
       
        setDataForm((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
       
        if(e.target.name==='location')
           setSelectedCity(null)
       
    }
    const handleImageChanged=(file)=>{
        
        console.log('Handle Image Path  Func Called and Pathe is :'+URL.createObjectURL(file))
        setImage(file)
        setDataForm((prev)=>({
            ...prev,
            imageURL:URL.createObjectURL(file)
         }))
         console.log(dataForm)
     }
     
      const handleTasksSkillsLanguagesPerformances = (category, value) => {
         
        setDataForm((prev) => ({
          ...prev,
          [category]:   value // Add value if checked
           
        }))
      }
   

    // Handle checkbox change
  const handleCheckboxChange = (e, category) => {
  
   
    const { value, checked } = e.target    
    console.log(dataForm)
    setDataForm((prev) => ({
      ...prev,
      [category]: checked ? [...prev[category], value] // Add value if checked
        : prev[category].filter((item) => item !== value), // Remove if unchecked
    }))
   
  }
    const selectWork=(e)=>{
        e.preventDefault()
        setDataForm({
            ...dataForm,
            [e.target.name]:e.target.value
        })
    } 
    const handleSalaryType=(e,type)=>{
        setDataForm((prev) => ({
            ...prev,
            salary: { ...prev.salary, type: e.target.value }
            }))
            setSalaryType(type)

    }
    const getAdresse=(value)=>{
        setDataForm((prev)=>({
            ...prev,
            ['adresse']:value

        }))
        console.log(value)

    }
    const handleOnCategoryChange=(e)=>{
        setDataForm((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
     const fetchCategories=async()=>{                                
                                const data=await getCategories(headers)                                
                                setCategoriesList(data||[])
                            }
          useEffect(()=>{
                          
                            fetchCategories()  
                            
                          
                           if(id)
                           {
                             getJobToEdit(id) 
                           
                           }
                           
                           else{                  
                            if(dataForm?.location?.trim()==='' )
                            {
                                setFilteredCities([])                            
                                return
                            }
                              const results = germanCities.filter(
                                    (city) =>
                                        city?.name.toLowerCase().startsWith(dataForm?.location?.toLowerCase())                 
                                    )               
                                    setFilteredCities(results.slice(0,10)) 
                                if(selectedCity)
                                {  
                                    setDataForm({
                                        ...dataForm,
                                        location:selectedCity?.name
                                    })
                                    setFilteredCities([])     
                                }
                            
                            }
                           
                           
                        },[id,dataForm.location,selectedCity]
                    )
    
  return (
    <div className='container-md-fluid container-lg p-0  ' >
        <div className="row p-0  m-0">
            <div className="col-12   col-md-9 mx-auto">
                <form onSubmit={handleOnSubmit} className=' py-2   rounded '>
                   
                   {jobToEdit?.imageUrl &&(  <img src={`${jobToEdit?.imageUrl}`}   className="img-fluid d-block border" />)}               
                    <div className="  m-auto mb-1"> 
                        <ImageUpload getFile={handleImageChanged} />
                    </div>
                     {imagePath}
                    {jobToEdit?.imageURL}
                    {dataForm?.imageURL}
                    <div className="  m-auto mb-1" >
                        <input type="text" value={dataForm.companyName} name='companyName' 
                            placeholder='Firma...'  onChange={handleOnChange} 
                            className=' form-control mb-1' />
                    </div>                
                    <div className="row m-auto  mb-1" > 
                        <div className="col-6 p-0">
                             <input type="text" value={dataForm.title} name='title' 
                                placeholder='Job Titel...'  onChange={handleOnChange} 
                                className='col-6 form-control mb-1' />
                        </div>
                        <div className="col-6 p-0">
                            <select name="category" value={dataForm.category} onChange={handleOnCategoryChange} className='form-select'>
                            <option value="">--Wähle den Bereich aus--</option>
                            {categoriesList?.length>0 && (categoriesList.map((item,index)=>(<option key={index} value={item._id}>{item.category}</option>)))}
                        </select>

                        </div>
                       
                        
                    </div> 
                    <div  className="  m-auto mb-1">
                                    <div className="border rounded p-1 ">
                                        <p className='m-0'><strong>Vertrag</strong></p>
                                        <ul className='px-1  w-100' >
                                                <li className=' list-group-item'>
                                                    <input type="checkbox" name='type' checked={dataForm?.type?.includes('unbefristet')} className=""
                                                    value="unbefristet"
                                                    onChange={(e) => handleCheckboxChange(e, "type")} />
                                                    <label className=' px-2' > unbefristet</label>
                                                </li>
                                                <li className=' list-group-item'>
                                                    <input type="checkbox" name='type' className=""
                                                        checked={dataForm?.type?.includes('befristet')}
                                                        value='befristet'
                                                        onChange={(e) => handleCheckboxChange(e, "type")} />
                                                    <label className=' px-2' > befristet</label>
                                                </li>
                                        </ul>
                                        </div>
                            <div className='border my-1 py-1 rounded '>
                                <p className='my-0 '><strong>Arbeitstage</strong></p>      
                                <ul className=' w-100 my-0 px-1 py-0' >
                                                <li className='  list-group-item'>
                                                    <input type="checkbox"  className=""
                                                        checked={dataForm?.work?.includes('Vollzeit') }
                                                        value='Vollzeit'
                                                        onChange={(e) => handleCheckboxChange(e, "work")}  />
                                                    <label className=' px-2' > Vollzeit</label>
                                                </li>
                                                <li className=' list-group-item'>
                                                    <input type="checkbox" className="" 
                                                    checked={dataForm?.work?.includes('Teilzeit') }
                                                        value='Teilzeit'
                                                        onChange={(e) => handleCheckboxChange(e, "work")}                                                 
                                                        />
                                                    <label className=' px-2' > Teilzeit</label>
                                                </li>
                                </ul>
                                <input type="checkbox"  value='Montag' checked={dataForm?.workingdays?.includes('Montag')}   onChange={(e) => handleCheckboxChange(e, "workingdays") } 
                                className=' mx-1'/>Montag
                                <input type="checkbox"  value='Dienstag' checked={dataForm?.workingdays?.includes('Dienstag')}   onChange={(e) => handleCheckboxChange(e, "workingdays") }
                                className=' mx-1'/>Dienstag
                                <input type="checkbox"   value='Mittwoch' checked={dataForm?.workingdays?.includes('Mittwoch')}   onChange={(e) => handleCheckboxChange(e, "workingdays") }
                                className=' mx-1'/>Mittwoch
                                <input type="checkbox"  value='Donnerstag' checked={dataForm?.workingdays?.includes('Donnerstag')}   onChange={(e) => handleCheckboxChange(e, "workingdays") }
                                className=' mx-1'/>Donnerstag
                                <input type="checkbox"  value='Freitag' checked={dataForm?.workingdays?.includes('Freitag')}   onChange={(e) => handleCheckboxChange(e, "workingdays") } 
                                className=' mx-1'/>Freitag
                                <input type="checkbox" value='Samstag' checked={dataForm?.workingdays?.includes('Samstag')}   onChange={(e) => handleCheckboxChange(e, "workingdays") } 
                                className=' mx-1'/>Samstag
                                <input type="checkbox"  value='Sonntag' checked={dataForm?.workingdays?.includes('Sonntag')}   onChange={(e) => handleCheckboxChange(e, "workingdays") } 
                                className=' mx-1'/>Sonntag
                        
                            <ul className='bg-white m-0'>
                                {dataForm?.workingdays?.length>0 &&(dataForm.workingdays.map((day,index)=>
                                <li key={index}>{day}</li>
                                ))}
                            </ul>
                            </div>
                    </div> 
                    <div className=" m-auto mb-1"> <Performances getPerformances={handleTasksSkillsLanguagesPerformances} initialperformances={jobToEdit?.performances}/>
                    
                    </div>
                    <div className=" m-auto mb-1"> <Tasks getTasks={handleTasksSkillsLanguagesPerformances} initialtasks={jobToEdit?.tasks}/></div>
                    <div className=" m-auto mb-1"><Skills getSkills={handleTasksSkillsLanguagesPerformances} initialSkills={jobToEdit?.skills}/></div>
                    <div className="w-lg-50 m-auto mb-1"> <Languges getLanguages={handleTasksSkillsLanguagesPerformances} initialLanguages={jobToEdit?.languages}/></div>                       
                    <div className=" m-auto mb-1">
                            <div className="  px-2 ">
                                <label className="form-label"><strong>Gehalt</strong></label>
                                <div className=''>
                                <div className="">
                                <input  type="radio"name="salaryType" value="hourly"
                                            onChange={(e)=>handleSalaryType(e,'hourly')} 
                                    /> Pro Stunde  
                                    <input
                                            type="radio"
                                            name="salaryType"
                                            value="monthly"
                                            onChange={(e)=>handleSalaryType(e,'monthly')}
                                            />Monatlich
                                </div>
                                <div className="">
                                        <span className='d-block'>ab</span>
                                        <input
                                            type="range"
                                            name="salaryAmount"
                                            min={salaryType==='monthly' ? 550:15}
                                            max={salaryType==='monthly' ? 10000:100}
                                            step={salaryType==='monthly' ? 150:2}
                                            value={dataForm?.salary?.amount}
                                            onChange={(e) =>
                                                setDataForm((prev) => ({
                                                ...prev,
                                                salary: { ...prev.salary, amount: Number(e.target.value) }
                                                }))
                                            }
                                            />
                                </div>
                                

                                </div>
                                <p>{dataForm.salary?.type} : {dataForm.salary?.amount}€</p>
                            </div>
                    </div>
                    <div className="  m-auto mb-1 position-relative">                  
                                <input type="text" value={dataForm.location} name='location' placeholder='location...'  
                                    onChange={handleOnChange} className='col-6 form-control mb-1'/>
                                <ul  className='list-group position-absolute bg-light m-1 z-3'>
                                    {filteredCities.length>0 ? (filteredCities.map((city, index) => (
                                        <li key={index} className='list-group-item'
                                            onClick={() =>{setSelectedCity(city)}} 
                                            style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #ccc",
                                                cursor: "pointer",
                                                color: selectedCity === city ? "white" : "black",
                                                backgroundColor: hoveredIndex === index ? "#007bff" : "white",
                                                color: hoveredIndex === index ? "white" : "black",
                                                transition: "background-color 0.3s ease",
                                                
                                                }}
                                                onMouseOver={()=>handleMouseOver(index)}
                                                onMouseLeave={() => setHoveredIndex(null)} >
                                            {city.name}               
                                        </li>)))
                                        :(<></>)}
                            </ul>                
                    </div>
                    
                    <div className="  m-auto mb-1 position-relative">
                        <Adresse setAdresse={getAdresse} initialAdresse={jobToEdit?.adresse}/>
                    </div>

                    <div className=" m-auto mb-1">
                        <textarea  value={dataForm.description} name='description'  rows='7' placeholder='Beschreibung...'  onChange={handleOnChange} className='form-control mb-1'/>
                    </div>
                    <div className=" m-auto mb-1">
                        <p className='text-danger'>{error}</p>
                        <button type='submit' className='btn btn-primary w-100'>save</button>
                        
                    </div>
                </form>
            </div>
        </div>
     </div>
      
  
  )
}

export default NewJob
