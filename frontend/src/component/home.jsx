// eslint-disable-next-line no-unused-vars
import   { useEffect ,useState} from 'react'
import axios from 'axios'
import JobCard from './jobCard'
import JobDetailsComponent from './jobdetailsComponent'
import useScreenSize from './useScreenSize'
import { useSelector } from 'react-redux'
import { getCategories } from '../utilities/CategoryService'
import { FaFilter, FaPhone } from "react-icons/fa"
import { FiMail } from 'react-icons/fi'
import { RiContactsFill } from 'react-icons/ri'
import RecomededJobs from './recomededJobs'
import { Link } from 'react-router-dom'


const Home = () => {
  const {user}=useSelector((state)=>state.auth)
   const headers={
          "Content-Type":"application/json",
          Authorization:`Bearer ${user?.token}`
      }

    const screen=useScreenSize()
    const recomededJobsList=RecomededJobs()
    const [categoryList,setCategoriesList]=useState([])
    const [jobs,setJobs]=useState([])
    const [limit,setLimit]=useState(3)
    const [totalPages,setTotalPages]=useState(1)
    const [currentPage,setCurrentPage]=useState(1)
    const [clickedJob,setClickedJob]=useState(null)
    const [filterList,setFilterList]=useState([])
    const [showFilter,setShowFilter]=useState(false) 
    const [feedback,setFeedback]=useState({
      name:'',
      email:'',
      text:''
    })  
    const[feedbackList,setFeedbackList]=useState([])
  const getAllJobs=async()=>{        
    try {
        const response=await axios.get(`/api/jobs/${limit}`, {
                                                                    params: {
                                                                      filters: filterList.join(','),
                                                                    },
                                                                  })
        if(response){
           console.log(response.data)
            setJobs( response.data.jobs)
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPages)
                  }        
    } catch (error) {
        console.log(error)        
    }
}
const handleClickOnJob=(job)=>{
  setClickedJob(job)

}
 const handleCurrentLocation=(mypath)=>{
                setClickedJob(mypath.job)    
            
        }
  const hanldeShowMore=(e)=>{
    e.preventDefault()
    setLimit(limit+3)
    
    
  }
  const fetchCategories=async()=>{                                
                                  const data=await getCategories(headers)                                
                                  setCategoriesList(data||[])
                              }
  const filtertoggler=()=>{
    setShowFilter((prev)=>!prev)
  }
  const handleCheckboxChange = (e) => {
  const value = e.target.value;
  if (e.target.checked) {
    setFilterList(prev => [...prev, value]);
  } else {
    setFilterList(prev => prev.filter(id => id !== value));
  }
}
const addfeedback=async()=>{
  
  try {
     const headers={
         
          Authorization:`Bearer ${user?.token}`
      }
    const response=await axios.post(`/api/feedbacks`,feedback,{headers})
    if (response.status === 200 || response.status === 201) {
      alert('Thank you for your feedback!');
      // Optionally reset feedback
      setFeedback((prev)=>({...prev,text:''}))
    } else {
      alert('Something went wrong!');
    }
  } catch (error) {
     console.error('Error submitting feedback:', error);
    alert('There was an error. Please try again later.')
    
  }
}
const fetchFeedback=async()=>{
  try {
        const headers={
         
          Authorization:`Bearer ${user?.token}`
      }
    const response=await axios.get(`/api/feedbacks`,{headers})
      console.log('response from feedback')
      console.log(response.data)
     if (response.status === 200 || response.status === 201) {
          setFeedbackList(response.data.feedbacks)
    } else {
      alert('Something went wrong!');
    }
    
  } catch (error) {
    console.log('error in Feedback...')
    console.log(error)
    
  }

}
useEffect(()=>{
    fetchCategories()
    getAllJobs()
    fetchFeedback()
    if(user)
    {
      setFeedback((prev)=>({...prev,name:user.username,email:user.email}))
    }

},[limit,currentPage,screen,filterList,user])

  return (
    <div className=' '> 
         <section className='py-5 '  style={{color:'#0C2577'}}>
              <div className="container">
                    <div className='py-2 my-1  text-center '>
                        <h3 className=' my-0'>Hallo {user?.username}</h3>
                        <p className='my-0 text-muted px-2'>Hier hast du deine Jobsuche im Griff.</p>
                    </div>
                      <div className='d-flex align-items-center py-2 my-1'>
                        <img  src="/images/JOB.png"  className=" rounded border p-1" style={{height:'75px',width:'100px'}}/>
                        <h3 className='px-1'><strong>Unsere neuesten Jobs für Sie</strong></h3>
                      </div>
                      <button className={showFilter? 'btn btn-primary mb-1':'btn btn-secondary mb-1'} onClick={filtertoggler}><FaFilter /> Filter</button>
                     {showFilter &&( <div className="row   p-0 m-0">
                             {categoryList.length>0 && (categoryList.map((item,index)=>(<div key={index} className='col-12 col-md-4 border-bottom  text-left'>
                              <input className="form-check-input " type="checkbox"
                               onChange={handleCheckboxChange} 
                               checked={filterList.includes(item._id)}
                               value={item._id}/>{item.category}
                              </div>))
                            )}
                        </div>)}
                      <div className="row ">
                                      {jobs?.length>0 ?  (    jobs.map((job)=>(
                                    <div key={job._id} className='bg-none px-1 col-12 col-md-6 col-lg-4 d-flex mb-1'>
                                            <JobCard job={job}   />
                                        </div>
                                  ))):(<></>)
                                  }
                              <div className='d-flex  justify-content-center align-items-center py-1'>
                                {/*  <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                                  disabled={currentPage === 1} className='btn '> &#9665; </button>
                                  <span className=''> Page {currentPage} of {totalPages} </span>
                                  <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                                  disabled={currentPage === totalPages} className='btn '>&#9655; </button> */}
                                  <button type='button ' className='btn btn-primary' onClick={hanldeShowMore}>mehr anzeigen</button>
                              </div>         
                        </div>
             </div>
         </section>
         <section className=' py-5 ' style={{backgroundColor:'#0C2577'}}>
            <div className="container" >
               <h3 className='text-white text-center'>Jetzt E-Mail eintragen und keine neuen Jobs mehr verpassen!</h3>
              <div className="row py-2">
              <form className='col-12 col-md-8 m-auto'>
                   <div className="input-group">
                       <span className="input-group-text" >@</span>
                       <input type="email" className='form-control' placeholder='email...'/>
                       <button className='btn btn-success'>save</button>
                   </div>
              </form>
           </div>
            </div>
         </section>
         {user && <section className='py-5'  style={{color:'#0C2577'}}>
            <div className="container ">
               <h3  className="fw-bold  mb-4 text-center">
                     Gemerkte Stellen
                    </h3>
              <div className="row justify-content-center ">
                     {jobs?.length>0 ?  (    jobs.map((job)=>(
                                        <div key={job._id} className='bg-none  col-12 col-md-6 col-lg-4   mb-1'>
                                           { job.savedJobList.map((item)=>(
                                            item.userId===user._id ?<JobCard job={job} />:null
                                           ))  }
                                        </div>
                                  ))):(<p className='text-primary m-0 p-0  text-center'>Sie haben noch keine Stelle gespeichert</p>)
                                  }
              </div>
            </div>
         </section>}
         {user &&  <section className='bg-light py-5'  style={{color:'#0C2577'}}>
            <div className="container ">
              <h3 className="fw-bold  mb-4 text-center">
                      Top-Jobs, die zu dir passen
                    </h3>

              <div className="row justify-content-center">
                                        {recomededJobsList?.length>0 ?  (    recomededJobsList.map((job)=>(
                                                    <div key={job._id} className='bg-none px-1 col-12 col-md-6 col-lg-4 d-flex mb-1'>
                                                        <JobCard job={job}   />
                                                    </div>
                                              ))):(<p className='text-primary m-0 p-0  text-center'>Check <Link  to="/profile">deine Profil </Link>ob zuständig ausgefühlt</p>)
                                              }
            </div>
            </div>
         </section>}
         <section className='py-5' style={{backgroundColor:'#F4F4ED',color:'#0C2577'}}>
           <div className="container">
                  <h3 className='text-center'>
                        Brauchen Sie Hilfe ? <br/> Kontaktieren Sie uns!
                    </h3>
                <div className="row  justify-content-center">
                    <div className='text-center col-12 col-md-4 border rounded bg-white  m-1 py-1  fs-3'>
                      <p className='m-0 text-center  py-1 ' > <FaPhone /></p>
                      <p>+49151********</p>
                     </div>
                    <div className='text-center col-12 col-md-3 border rounded bg-white m-1  py-1 fs-3'>
                      <p className="m-0 text-center  "><FiMail /></p>
                      <a
                           href='mailto:eng.ahmad.alassag@gmail.com'
                          aria-label="Send email to eng.ahmad.alassaf@gmail.com"
                      > sende Email!</a>
                    </div>
                    <div className='text-center col-12 col-md-4 border rounded bg-white m-1  py-1 fs-3'>
                      <p className="m-0 text-center"><RiContactsFill /></p>
                      <Link to="/contactus" >Kontakt Formular</Link>
                      </div>
                    </div>

           </div>

         </section>
         <section className='py-5' style={{backgroundColor:'#F4F4ED',color:'#0C2577'}}>
            <div className="container">
              <h3 className='fw-bold  mb-4 text-center'>
                Hilf uns, besser zu werden – mit deinem Feedback
              </h3>
              <div className="row justify-content-center">
                <form  className="form col-12 col-md-6 "
                   onSubmit={(e) => { e.preventDefault(); // Prevent default form submission
                                                addfeedback();
                                    }} >
                  <div>
                        <input type="text" name="name"  className='form-control my-1'
                            onChange={(e) =>setFeedback((prev) => ({ ...prev, name: e.target.value }))}
                            value={user?.username || feedback.name }
                            disabled={!!user?.username}
                            placeholder={user?.username || 'Name...'}  />
                   </div>
                   <div>
                        <input type="email" name="email" className='form-control my-1'
                            onChange={(e) =>   setFeedback((prev) => ({ ...prev, email: e.target.value })) }
                            value={user?.email || feedback.email }
                            disabled={!!user?.email}
                            placeholder={user?.email || 'Email...'} />
                   </div>
                   <div>
                    <textarea    className='form-control my-1' rows='8'
                      name="text"
                      value={feedback.text}
                      onChange={(e) =>
                        setFeedback((prev) => ({ ...prev, text: e.target.value }))
                      }
                      placeholder="Your feedback..."
                    ></textarea>
                   </div>
                   <button type="submit" className='btn btn-primary my-1 w-100 m-auto' disabled={!user}> send</button>
                </form>

              </div>
            </div>
         </section>
         <section className='py-5' style={{backgroundColor:'#F4F4ED',color:'#0C2577'}}>
           <div className="container">
               <h3 className='fw-bold  mb-4 text-center'>Echte Meinungen. Echte Menschen.</h3>
                 <div id="carouselExampleDark" className="   carousel carousel-dark slide" data-bs-ride="carousel">
                     
                      <div className="  m-auto   w-50 text-center   carousel-inner">
                       {feedbackList?.length >0 ? feedbackList.map((item,index)=>
                        (
                        <div className={`carousel-item  ${index === 0 ? 'active' : ''}`} data-bs-interval="10000">
                           <p className='text-center'>{item.user.username}</p>
                            {item.text}
                        </div>)):(<></>)}
                    </div>
           </div>
           </div>
         </section>
         </div>
  )
}

export default Home
