const express=require('express')
const mongoose=require('mongoose')
const commentSchema=mongoose.Schema(
    {
    text:{
        type:String,
        required:true
    },
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:'User'

   }
   ,
   job:{
    type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref:'Job'

     },
}, 
{ timestamps: true } )

module.exports=mongoose.model('Comment',commentSchema)