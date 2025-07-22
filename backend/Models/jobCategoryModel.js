const mongoose=require('mongoose')
const jobCategorySchema=mongoose.Schema({
    category:{
        type:String,
        required:true
    }

},{ timestamps: true })
module.exports=mongoose.model('Category',jobCategorySchema)