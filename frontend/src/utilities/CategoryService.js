 import axios from 'axios'

 
 export const getCategories=async(headers)=>{
     try {
            const response=await axios.get(`/api/categories`,{headers})
            if(!response)
            {

            }
            else{
                
                return response.data.categoryList
            }
            
        } catch (error) {
            console.log(error)
            
        }

}

