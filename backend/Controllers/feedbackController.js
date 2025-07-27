const asyncHandler = require('express-async-handler');
const Feedback=require('../Models/feedbackModel');

const addfeedback=asyncHandler(async(req,res)=>{
    
    const {email,name,text}=req.body
    
    if(!text )
    {
        res.status(500).json({
            message:'please add all fields',
            feedback:null
        })
    }
    try {
        const feedback=await Feedback.create({
            user:req.user.id,
            text
           
        })
        if(!feedback)
        {
             res.status(500).json({
                message:'an error occured in server ....',
                feedback:null
             })

        }
        res.status(200).json(feedback)
    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:'There is an Error occured in server... ',
            error:error
        })
        
    }

})
const getFeedbacks=asyncHandler(async(req,res)=>{
    try {
        const feedbackList=await Feedback.find().populate('user')
        if(!feedbackList)
        {
            res.status(200).json({
                message:'there is no Feedback jet',
                feedbackList:null
            })
        }
        res.status(200).json({
            message:'',
            feedbacks:feedbackList
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'There is an Error occured in server... ',
            error:error
        })
        
    }

})
const deleteFeedback=asyncHandler(async(req,res)=>{
    
    try {
        const feedback=await Feedback.findOne({_id:req.params.id})
       
        if(!feedback){
              
            res.status(500).json({
                message:'There is no feedback',
                feedback:null
            })
        }
        const deletedFeedback=await Category.findByIdAndDelete(feedback._id)
         
        res.status(200).json({
             
            message:'Feedback deleted successfully...',
            feedback:deletedFeedback

        })
        
        
    } catch (error) {
        
        res.status(500).json({
            message:'An Error in server occured...',
            error:error
        })
        
    }
})
module.exports={
    addfeedback,getFeedbacks,deleteFeedback
}