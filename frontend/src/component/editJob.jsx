
    import React, { useState,useEffect } from 'react'
    import axios from 'axios'
    import { useSelector } from 'react-redux'
    import {useParams } from 'react-router-dom'
    import  { Country, State, City } from 'country-state-city'
    import {FaTimes} from 'react-icons/fa'
    import ImageUpload from './ImageUpload '
    import Tasks from './tasks'
    import Skills from './skills'
    import Languges from './languages'
    import Performances from './performance'
    import Adresse from './adresse'

const EditJob = () => {
 
            const  {id}  = useParams()           
             const[error, setError]=useState(null)
            const [dataForm,setDataForm]=useState({
                title:'',
                companyName:'',
                description:'',
                type:[],
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
         const {user}=useSelector((state)=>state.auth)
         const getJob=async (id)=>{
            try {
                const headers={            
                    Authorization:`Bearer ${user.token}`
                }
                const response= await axios.get(`/api/jobs/${id}`,{headers})                   
                if(response)
                {      
                    console.log('response from edit')         
                        console.log(response.data) 
                  await  setDataForm(response.data)     
                    setError('')          
                  
                }
            } 
            catch (error) {
                console.log(error)
                setError(error)
                
            }
        }
        const handleOnSubmit=async(e)=>{       
                 e.preventDefault()  
                console.log(error)
                const headers={            
                    Authorization:`Bearer ${user.token}`
                }
                try {  
                    console.log('submittion new job and dataForm values:')
                    console.log(dataForm)
                    const formData = new FormData()
                    formData.append('file',image)
                    formData.append('title',dataForm.title)
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
                    const response= await axios.post(`/api/jobs`,formData,{headers})                   
                    if(response)
                    {               
                             
                        setDataForm(response.data)     
                        setError('')          
                      
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
        setDataForm((prev) => ({
          ...prev,
          [category]: checked ? [...prev[category], value] // Add value if checked
            : prev[category].filter((item) => item !== value), // Remove if unchecked
        }))
        console.log(dataForm)
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
              useEffect(()=>{                          
                getJob(id)
                            },[id]
                        )
        
      return (
        <div className='' >
          
           <div className=' my-2  rounded shadow  ' >      
            <div className=" border-0 bg-light">        
              <div className=" border-0 ">        
                       
                
              </div>             
                 <form onSubmit={handleOnSubmit} className=' p-2  '>                
                     <div className="  w-75 m-auto mb-1"> 
                        <ImageUpload getFile={handleImageChanged}/>
                    </div>
                    
                            <div className="w-75 m-auto mb-1" >
                                <input type="text" value={dataForm.companyName} name='companyName' 
                                    placeholder='Firma...'  onChange={handleOnChange} 
                                    className=' form-control mb-1' />
                            </div>
                    
                     <div className="w-75 m-auto  mb-1" >                      
                        <input type="text" value={dataForm.title} name='title' 
                        placeholder='Job Titel...'  onChange={handleOnChange} 
                        className='col-6 form-control mb-1' />
                     </div> 
                     <div  className=" w-75 m-auto mb-1">
                                      <div className="border rounded p-1 ">
                                        <p className='m-0'><strong>Vertrag</strong></p>
                                        <ul className='px-1  w-100' >
                                                <li className=' list-group-item'>
                                                    <input type="checkbox" name='' className=""
                                                    value="unbefristet"
                                                    onChange={(e) => handleCheckboxChange(e, "type")} />
                                                    <label className=' px-2' > unbefristet</label>
                                                </li>
                                                <li className=' list-group-item'>
                                                    <input type="checkbox" className=""
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
                                                        value='Vollzeit'
                                                        onChange={(e) => handleCheckboxChange(e, "work")}  />
                                                    <label className=' px-2' > Vollzeit</label>
                                                </li>
                                                <li className=' list-group-item'>
                                                    <input type="checkbox" className="" 
                                                        value='Teilzeit'
                                                        onChange={(e) => handleCheckboxChange(e, "work")}                                                 
                                                        />
                                                    <label className=' px-2' > Teilzeit</label>
                                                </li>
                                  </ul>
                                <input type="checkbox" name="" value='Montag'   onChange={(e) => handleCheckboxChange(e, "workingdays") } className=' mx-1'/>Montag
                                <input type="checkbox" name="" value='Dienstag'  onChange={(e) => handleCheckboxChange(e, "workingdays") } className=' mx-1'/>Dienstag
                                <input type="checkbox" name=""  value='Mittwoch  '  onChange={(e) => handleCheckboxChange(e, "workingdays") }className=' mx-1'/>Mittwoch
                                <input type="checkbox" name="" value='Donnerstag'  onChange={(e) => handleCheckboxChange(e, "workingdays") } className=' mx-1'/>Donnerstag
                                <input type="checkbox" name="" value='Freitag'  onChange={(e) => handleCheckboxChange(e, "workingdays") } className=' mx-1'/>Freitag
                                <input type="checkbox" name="" value='Samstag'  onChange={(e) => handleCheckboxChange(e, "workingdays") } className=' mx-1'/>Samstag
                                <input type="checkbox" name="" value='Sonntag'  onChange={(e) => handleCheckboxChange(e, "workingdays") } className=' mx-1'/>Sonntag
                           
                            <ul className='bg-white m-0'>
                                {dataForm?.workingdays?.length>0 &&(dataForm.workingdays.map((day,index)=>
                                   <li key={index}>{day}</li>
                                ))}
                            </ul>
                            </div>
                    </div> 
                    <div className="w-75 m-auto mb-1"> <Performances getPerformances={handleTasksSkillsLanguagesPerformances}/></div>
                    <div className="w-75 m-auto mb-1"> <Tasks getTasks={handleTasksSkillsLanguagesPerformances}/></div>
                    <div className=" w-75 m-auto mb-1"><Skills getSkills={handleTasksSkillsLanguagesPerformances}/></div>
                     <div className="w-50 m-auto mb-1"> <Languges getLanguages={handleTasksSkillsLanguagesPerformances}/></div>                       
                     <div className="w-75 m-auto mb-1">
                             <div className="  px-2 ">
                                <label for="customRange" className="form-label"><strong>Gehalt</strong></label>
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
                                            value={dataForm.salary.amount}
                                            onChange={(e) =>
                                                setDataForm((prev) => ({
                                                ...prev,
                                                salary: { ...prev.salary, amount: Number(e.target.value) }
                                                }))
                                            }
                                            />
                                   </div>
                                  
    
                                </div>
                                <p>{dataForm.salary.type} : {dataForm.salary.amount}€</p>
                             </div>
                      </div>
                     <div className=" w-75 m-auto mb-1 position-relative">                  
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
                     
                      <div className=" w-75 m-auto mb-1 position-relative">
                        <Adresse setAdresse={getAdresse} adresse={dataForm.adresse}/>
                      </div>
    
                    <div className="w-75 m-auto mb-1">
                         <textarea  value={dataForm.description} name='description'  rows='7' placeholder='Beschreibung...'  onChange={handleOnChange} className='form-control mb-1'/>
                    </div>
                     <div className="w-75 m-auto mb-1">
                        <p className='text-danger'>{error}</p>
                        <button type='submit' className='btn btn-primary w-100'>save</button>
                        
                     </div>
                 </form>
                 </div>
            </div>      
        </div>
      
      )
    }
export default EditJob
