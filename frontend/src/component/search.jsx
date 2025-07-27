import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import CitySearch from './citySearch'
import jobsuche2 from '../assets/jobsuche2.JPG'
import {Link ,Navigate,useNavigate,useLocation} from 'react-router-dom'


const Search = ({ getCityData}) => {

    const [shadow, setShadow] = useState("7px 7px 10px rgba(0,0,0,0.5)")
    const [result,setResult]=useState([])
    const [city,setCity]=useState('')
    const [searchText,setSearchText]=useState('')
    const navigate = useNavigate()
    const location=useLocation()
    const [error,setError]=useState(null)
    const [message,setMessage]=useState(null)
    const [height,setHeight]=useState(0)
 const handleSearchChange =async (e) => {
    setSearchText(e.target.value)
      setResult([])
      setError(null)
      setMessage(null)

}
const runSearch=async ()=>{
  console.log('Run Search fired....')
  console.log(searchText)
  if (searchText.trim() !== "") {
    try {
      console.log('city name')
      console.log(city)
      console.log('search text')
      console.log(searchText)
      const response = await axios.get(`/api/search/${searchText}/${city}`);
      if (response) {
        console.log("response.data")   
        console.log(response.data)       
        setResult(response.data.result) 
        if (response.data.result.length===0 )
           setMessage(`Es gibt keine Stellen für :${searchText} in ${city}`)  
        else{
          setMessage(response.data.result.length+' Ergebnis/Ergebnisse')  
         
        }
                
      }
      else{
        console.log('No Response.....')
        
      }
    } catch (error) {
      console.log('Error in search controller....')
      console.log(error)
      setError(error.message)
    
    }
  }
}
const getCity=(cityname)=>{
    setCity(cityname)
}
const handleOnClick=(item)=>{
  setSearchText(item.title)
  setResult([])

 // navigate("/job", { state: { job: item } })  
}
const setBackgroundHeight=()=>{
  const navbarHeight=document.getElementById('navbar').offsetHeight
  const screenHeight=window.innerHeight
  console.log('navbarHeight',navbarHeight)
    console.log('windowHeight',screenHeight)
  setHeight(screenHeight-navbarHeight)

}
useEffect(()=>{
       
          setBackgroundHeight()
          if(result.length>0)
             navigate(`/showsearchresult`,{state:{result}})


},[result]) 
const style={
  searchstyle:{
    boxShadow: shadow,
    transition: "box-shadow 0.3s ease-in-out",
    height:'60px',

  },
  titlestyle:{
    borderRadius:'10px 0px 0px 10px',
    borderRight:'none'

  },
  searchresultStyle:{
    padding:'10px 10px 10px 15px',
    boxShadow:'2px 2px  5px rgba(0, 0, 0, 0.3)',
    transition: "box-shadow 0.3s ease-in-out",
    border:'1px solid rgb(182, 179, 179)',
    borderRadius:'5px ',
    position:'absolute',
    zIndex:'10'

  }
}
  return (

    (<div id='search' className=' d-flex justify-content-center align-items-center ' 
          style={{
          backgroundImage: `url(${jobsuche2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: `${height}px`,
          width: '100%',
        }}>
        <div className="container">
          <div className='row justify-content-center   p-0 m-0 w-100'>
            <div className="col-12  col-md-9 justify-content-between d-flex   p-0 rounded " 
                    style={style.searchstyle} onMouseEnter={() => setShadow("5px 5px 15px rgba(0, 0, 0, 0.3)")}
                                              onMouseLeave={() => setShadow("0px 0px 0px rgba(0,0,0,0)")}>
                    <div className="d-flex col-10"  >
                      <input
                        type="text"
                        name="searchText"
                        className="form-control  "
                        style={style.titlestyle}
                        value={searchText}
                        placeholder="Jobtitel..."
                        onChange={(e)=>handleSearchChange(e)} // Handle the search input 
                      />
                      <CitySearch  sendCity={getCity}/>
                      </div>
                      <div className="col-2 ">
                          <button
                            className="btn btn-primary  w-100 h-100"
                            style={{marginLeft:'5px'}}
                            type="button" // Changed from submit to button
                            onClick={runSearch}
                          > <FaSearch /> </button>
                        </div>
            </div>
            <div className='col-12  col-md-9'>
                  {message &&(<p className={result.length>0 ? 'text-muted':'text-danger   '}> {message}</p>)}
            </div>
          </div>
        </div>
    </div>

  ))
}

export default Search
