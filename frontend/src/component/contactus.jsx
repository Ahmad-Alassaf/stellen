import React from 'react'

const ContactUs = () => {
  return (
    <div className='py-3 text-center'  style={{ minHeight: '50vh' ,backgroundColor:'#F2FAFB',color:'#0C2577'}}>
       <div className="container">
           <h4><strong>Stellen Hilfe & Kontakt</strong></h4>
           <div className='alert alert-success' style={{minHeight:'70px',color:'#0C2577'}}>
            <p className="m-0">
               <strong>Wir beraten Sie Gerne unter:</strong> 
            </p>
            <p className="m-0">
                     004915175614666
            </p>
           </div>
           <div className='border-bottom py-3 '>
              <h3><strong>Oder</strong></h3>
           </div>
           <div className="row py-3 justify-content-center"> 
               <div className="col-12 col-md-8 col-lg-6">
           <form className='form   p-1  rounded shadow '>
              <div className=''>
                <input type="text" id='name' className='form-control' placeholder='Name...' />
              </div>
               <div className=''>
                <input type="email" id='name' className='form-control my-1' placeholder='Email...' />
              </div>
               <div className=''>
                <textarea  id='name' className='form-control' placeholder='Message...' />
              </div>
              <button className='btn btn-primary my-1'>Senden</button>
           </form>
           </div>
           </div>
       </div>
          </div>
  )
}

export default ContactUs
