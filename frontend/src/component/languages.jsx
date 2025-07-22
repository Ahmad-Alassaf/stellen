import { useState, useEffect } from "react"
import axios from 'axios'

const Languges = ({getLanguages,initialLanguages}) => {
    const [languages, setLanguages] = useState([
      'Deutsch','Englisch','Fransösich','Arabic','Test1','test lang1'
    ]);
    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguages?initialLanguages:[]);
  
    useEffect(() => {
       
     
    })
    const handleChange = (event) => {
      setSelectedLanguage((prev) => 
        prev.includes(event.target.value) 
          ? prev.filter((item) => item !== event.target.value)  // Remove if already selected
          : [...prev, event.target.value] // Add new selection
      )
     
    }
    const deleteLanguage=(e,lang)=>{
      e.preventDefault()
      setSelectedLanguage((prev) => 
               prev.filter((item) => item !== lang)  // Remove if already selected
          
      )
     

    }
    useEffect(()=>{
      if(initialLanguages && languages.length===0)
        setLanguages(initialLanguages)
      getLanguages('languages',selectedLanguage)
    },[initialLanguages,languages])
   
    return (
      <div className="">
      
        <select onChange={handleChange} className="form-select ">
          <option value="">-- Choose a language --</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="d-flex flex-wrap">
        {selectedLanguage && (
          selectedLanguage.map((item)=>( 
            <div className="d-flex justify-content-between  py-2 border rounded shadow px-1 m-1 bg-info-subtle">
               <div className="border-end px-1"> {item} </div>             
               <button className=' btn btn-close' onClick={(e)=>deleteLanguage(e,item)}/>
     

            </div>
             
              
            ))
         
        )}

        </div>
       
      </div>
    );
  };

export default Languges
