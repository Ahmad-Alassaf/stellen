const mongoose=require('mongoose')
const feedbackSchema=mongoose.Schema({
    
    text:{type:String,require:true},
     user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
},{timestamp:true})
module.exports=mongoose.model('Feedback',feedbackSchema)