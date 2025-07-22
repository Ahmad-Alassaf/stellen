const mongoose=require('mongoose')
const profileSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensure one-to-one

    },
    careerHistory:[{
        companyName:{type:String},
        start:{ type:Date ,default:Date.now },
        end:{type:Date  ,default:Date.now  },
        description:{type:String},
        tasks:[]
    }],
    education :[ {
                    start:{ type:Date  },
                    end:{type:Date    },
                    institute:{type:String},
                    description:{type:String}
               }],
    
   skills:[{
    name:{
        type:String
    },
    level:{
        type:String
    }
   }],
   languages:[{name:{type:String},level:{type:String}}],
   projects:[{
    name:{type:String},
    description:{type:String},
    technologies:[String],
    link:{type:String}
   }]
},{ timestamps: true })
module.exports=mongoose.model('Profile',profileSchema)