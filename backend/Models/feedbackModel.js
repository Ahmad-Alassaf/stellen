const mongoose=require('mongoose')
const feedbackSchema=mongoose.Schema({
    email:{type:String, required: true},
    name:{type:String, required: true},
    text:{type:String,require:true}
},{timestamp:true})
module.exports=mongoose.model('Feedback',feedbackSchema)