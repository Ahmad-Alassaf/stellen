const Job=require('../Models/jobModel')
const asyncHandler =require('express-async-handler')
const search=asyncHandler(async(req,res)=>{  
    const {title,city}=req.params    
    try {
        console.log(city)
        if(city && city.trim() !== '' && city !== 'null' && city !== 'undefined')
        {
            console.log('first if... ')
            const searchResult=await Job.find({
            title: { $regex: title, $options: "i" },
           location: { $regex: city, $options: "i" }
                 })// Case-insensitive search

         return    res.status(200).json({
                city:city,
                result:searchResult
            })

        }
        else{
            console.log('else... ')
            
            const searchResult=await Job.find({
                title: { $regex: title, $options: "i" },
             //  location: { $regex: city, $options: "i" }
            })// Case-insensitive search

       return   res.status(200).json({
            city:'ganz Land',
            result:searchResult
        })
            

        }
       
      }  catch (error)
           {console.error(error);
            return res.status(500).json({ message: "Server error...", error: error.message });}
})
module.exports ={
    search
}