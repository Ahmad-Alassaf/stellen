import {useState,useEffect} from 'react'



const Adresse = ({setAdresse,initialAdresse}) => {
    const [adresseForm,setAdresseForm]=useState({
        city:initialAdresse?.city,
        street:initialAdresse?.street,
        housNumber:initialAdresse?.housNumber
    })
    const handleOnChange=(e)=>{
        
        setAdresseForm((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(initialAdresse)
            setAdresseForm(initialAdresse)
        
    },[initialAdresse])
  return (
    <div className='border rounded '>
        
        <div className='row m-1'>
            <input type="text" name='city' value={adresseForm?.city} onChange={handleOnChange}  
            className='col-4 form-control w-50  ' placeholder='Ort...'/>
        </div>
        <div  className='row m-1'>
            <input type="text" name='street' value={adresseForm?.street} onChange={handleOnChange} 
            className='col-4 form-control w-50' placeholder='Strasse...'/>
        </div>   
         <div className='row m-1'>  
            <input type="text" name='housNumber' value={adresseForm?.housNumber} onChange={handleOnChange}
            className='col-4 form-control w-25' placeholder='HausNr...' />
        </div>
      
    </div>
  )
}

export default Adresse
