const User=require('../Models/userModel')
const Profile=require('../Models/profileModel')
const {addProfile}=require('./profileController')
const jwebtoken=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const register=asyncHandler(async (req,res)=>{    
    //check if all fields are not empty
    const {username,email,password,confirmpassword}=req.body
    console.log(req.body)
    try {
    if( !username || !email || !password || !confirmpassword)
    {
        res.status(400)
        throw new Error(' Please add all Fields')
    }
    if(password !==confirmpassword)
    {
        res.status(400)
        throw new Error(' Password and Confirmpassword are not equal...')
    }
    // check if email exist
    const isExist=await User.findOne({email})
    if(isExist)
    {
        res.status(404)
        throw  new Error('Email is already exist...');
    }
    const salt=await bcrypt.genSalt(10)
    const hasedPassword=await bcrypt.hash(password,salt)
   
         const newUser=await User.create({
        username:username,
        email:email,
        password:hasedPassword,
        role:'user',
       
    })
        
   
   
   
    if(newUser)
    {
       const newProfile=await Profile.create({
            user:newUser._id,
            careerHistory:[],
            education:[],
            skills:[],
            languages:[],
            projects:[]


        })
        if(newProfile){
            newUser.profile=newProfile
            await newUser.save()
        }
        res.status(200).json({
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role,
            token:generateToken(newUser.id),
            profile:newUser.profile
        }) 
    }
    else {res.status(500).json({message:'Error'})}
    } catch (error) { console.log(error) }
})
const generateToken=(id)=>{
    return jwebtoken.sign({id},process.env.JWT_SECRET,{expiresIn:'10d'})

}
const login=asyncHandler(async (req,res)=>{
    //check if all fields are not empty
    const {email,password}=req.body
    try {
         if(  !email || !password )
    {
        res.status(400)
        throw new Error(' Please add all Fields')

    }
    const user=await User.findOne({email}).populate('profile')

   
    if(  !user )
    {
        res.status(400)
        throw new Error(' Email not Exist.')

    }
    if(await bcrypt.compare(password,user.password))
    {
        res.status(200)
        res.json({
            _id:user.id,
            username:user.username,
            email:user.email,
            role:user.role,
            token:generateToken(user.id),
            profile:user.profile
        })
    }
    else{
        res.status(404)
        throw new Error('Invalid Credintional data.....')
    }
    
        
    } catch (error) {
        console.log(error)
        
    }
    
   

})
const getMe=async (req,res)=>{
    

}
module.exports={
    register,login,getMe
}