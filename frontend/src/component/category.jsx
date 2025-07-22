import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import  { getCategories } from '../utilities/CategoryService'


const Category = () => {
     const {user}=useSelector((state)=>state.auth)
    
    const [categoryTxt,setCategoryTxt]=useState('')
     const headers={
          "Content-Type":"application/json",
          Authorization:`Bearer ${user.token}`
      }
    const [categoryList,setCategoryList]=useState([])
    /* const getcategories=async()=>{
         try {
            const response=await axios.get(`${myServer}/api/categories`,{headers})
            if(!response)
            {

            }
            else{
                console.log('categoryList....')
                console.log(response.data)
                setCategoryList( response.data.categoryList)
            }
            
        } catch (error) {
            console.log(error)
            
        }

    } */
    const newCategory=async(e)=>{
        e.preventDefault()
        try {
            const response=await axios.post(`/api/categories`,{categoryTxt},{headers})
            if(!response)
            {
                console.log(response)

            }
            else{
               
                 setCategoryTxt('')
               const data = await getCategories( headers);
                    setCategoryList(data || [])
                 
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const handleDeleteCategory=async(id)=>{
      
        try {
             
            const response=await axios.delete(`/api/categories/${id}`,{headers})
             
            if(!response)
            {
                
                console.log('Frontend: threre is no response...')

            }
            else{
                console.log(response.data)
               
                 const updated = await getCategories(headers);
                    setCategoryList(updated || [])
            }
            
        } catch (error) {
            
            console.log(error)
            
        }

    }
    const handleOnMouseEnter=(e)=>{
        if(e.key==='Enter')
        {
            newCategory()
        }

    }
    useEffect(()=>{
       const fetchData = async () => {
                const categories = await getCategories( headers);
                setCategoryList(categories || []);
            }
            fetchData()

            
                
    },[])
  return (
    <div className=''>
        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target='#categoryMopdal'>New Category</button>
        <div className="row">
        <ul className='list-group mt-5 col-12 col-md-6 m-auto'>
            {categoryList.length>0 &&(categoryList.map((item,index)=>(<li key={index} className='list-group-item p-0 '>
                <div className='d-flex justify-content-between'>
                    <p className=' px-2 m-0'> {item.category}</p>
                    <button className='btn btn-danger' onClick={()=>handleDeleteCategory(item._id)}>Delete</button>

                </div>
               
                </li>)))} 
        </ul>
        </div>
        <div className="modal fade" id='categoryMopdal'>
            <div className="modal-dialog" id="exampleModal">

               <div class="modal-content">
                    <div className="modal-header">
                        <div className="modal-body">
                             <form className='input-group'>
                                <input type="text " className='form-control' 
                                value={categoryTxt} 
                                onChange={(e) => setCategoryTxt( e.target.value )}
                                onMouseEnter={handleOnMouseEnter}
                                placeholder='Category Name...' />
                                <button className='btn btn-primary' onClick={newCategory}>Save</button>
                            </form>

                        </div>
                    </div>

               </div>
               
            </div>
        </div>
      
    </div>
  )
}

export default Category

