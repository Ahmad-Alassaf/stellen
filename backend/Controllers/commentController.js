const Comment=require('../Models/commentModel')
const asyncHandler=require('express-async-handler')
const postComment=asyncHandler(async(req,res)=>{
  
    const {text,user}=req.body
    const id=req.params.id
    console.log('Req.Body.......')
    console.log(req.body)
    if(text !=='')
    {
        try {
            const comment=await Comment.create({
                text:text,
                user:req.user.id,
                job:id
            })
            if(comment){
                console.log('comment saved....')
                res.status(200).json(comment)
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

})
const getComments=asyncHandler(async(req,res)=>{
    
  
     try {
            const response=await Comment.find({job:req.params.id}).sort({ createdAt: -1 }).populate('user')
            if(response)
                {
                    res.status(200).json(response)
                    
                }
                else { 
                    res.status(401)
                    throw new Error(' no comments ....')
                 }
           
            
        } catch (error) {
            console.log(error)
            
        }

})
module.exports={
    postComment,getComments
}