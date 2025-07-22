const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type: String,
        required:[true,'Pleas add username...'],
       

    },
    email:{
        type: String,
        required:[true,'Please add Email...'],
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password:{
        type: String,
        required:[true,'Please add Password...'],
       
    },
    role:{
        type: String,
        enum:['admin','editor','user'],
        default: 'user'
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,//profile id
        ref:'Profile',
       sparse:true
    }

},{ timestamps: true })
module.exports=mongoose.model('User',userSchema)