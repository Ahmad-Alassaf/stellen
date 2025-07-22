const express=require('express')
const Profile=require('../Models/profileModel')
const User =require('../Models/userModel')
const asyncHandler=require('express-async-handler')
const addcareer=asyncHandler(async(req,res)=>{
    const {careerHistory,education,skills,languages,projects}=req.body
   try {
       const createdProfile=await Profile.create({
        careerHistory:JSON.parse(careerHistory || []),
        education:JSON.parse(education||[]),
        skills:JSON.parse(skills||[]),
        languages:JSON.parse(languages|| []),
        projects:JSON.parse(projects||[]),
        userId:req.user._id

        
    })
    if(!createdProfile)
    {
        res.status(500)
        throw new Error('Server: Profile not succeffully created...')
    }
    const user=await User.findOne({_id:req.user._id})
    if(user)
    {
        user.profile=createdProfile._id
        user.save()
    }
    res.status(200).json({
        message:'Profile created ',
       profile: createdProfile
    })
    
   } catch (error) {
        res.status(400)
        throw new Error('Server: Profile not succeffully created...')
    
   }

})
const getProfile=asyncHandler(async(req,res)=>{
    try {
       
         const fetchedProfile=await Profile.findOne({_id:req.params.id})
    if(!fetchedProfile)
    {
        res.status(400)
        throw new Error('There is no Profile matched id')
    }
    res.status(200).json({
        message:'',
        profile:fetchedProfile
    })
        
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
        
        
    }
   

})
const addOneCareer=asyncHandler(async(req,res)=>{
   
    
    const {companyName,start,end,description,tasks}=req.body
    console.log(req.body)
    try {
        const profile= await Profile.findOne({_id:req.params.id})
        if(!profile)
        {
            res.status(400)
            throw new Error('profile not found....')
        }
        const newCareer={
            companyName,
             start,
              end,
              description,
              tasks:typeof tasks === 'string' ? JSON.parse(tasks) : tasks,
       }
       profile.careerHistory.push(newCareer)
        await profile.save()
        console.log(profile)
        res.status(200).json({
            message:'profile aktuallisiert...',
            profile
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Server: an Error occured '})
        
    }

})
const deleteOneCareer=asyncHandler(async(req,res)=>{
    try {
        console.log(req.params)
         const fetchedProfile=await Profile.findOne({_id:req.params.id})
        
         fetchedProfile.careerHistory.splice(req.params.index,1)
         await fetchedProfile.save()
        res.status(200).json({
            message:'Profile wurde deleted...',
            profile:fetchedProfile
        })

    } catch (error) {
        console.log(error)
        
    }

})
const addeducation=asyncHandler(async(req,res)=>{
    const {institute,start,end,description}=req.body
    console.log(req.body)
    try {
        const profile= await Profile.findOne({_id:req.params.id})
        if(!profile)
        {
            res.status(400)
            throw new Error('profile not found....')
        }
        const neweducation={
            institute,
             start,
              end,
              description,
             
       }
       profile.education.push(neweducation)
        await profile.save()
        console.log(profile)
        res.status(200).json({
            message:'profile aktuallisiert...',
            profile
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Server: an Error occured '})
        
    }

})
const deleteOneeducation=asyncHandler(async(req,res)=>{
      try {
        
         const fetchedProfile=await Profile.findOne({_id:req.params.id})
        
         fetchedProfile.education.splice(req.params.index,1)
         await fetchedProfile.save()
        res.status(200).json({
            message:'Profile wurde deleted...',
            profile:fetchedProfile
        })

    } catch (error) {
        console.log(error)
        
    }

    
})
const addSkill=asyncHandler(async(req,res)=>{
    const {name,level}=req.body
    console.log(req.body)
    try {
        const profile= await Profile.findOne({_id:req.params.id})
        if(!profile)
        {
            res.status(400)
            throw new Error('profile not found....')
        }
        const newSkill={
            name,
            level
             
       }
       profile.skills.push(newSkill)
        await profile.save()
        console.log(profile)
        res.status(200).json({
            message:'profile aktuallisiert...',
            profile
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Server: an Error occured '})
        
    }

})
const deleteOneSkill=asyncHandler(async(req,res)=>{
      try {
        
         const fetchedProfile=await Profile.findOne({_id:req.params.id})
        
         fetchedProfile.skills.splice(req.params.index,1)
         await fetchedProfile.save()
        res.status(200).json({
            message:'Profile wurde deleted...',
            profile:fetchedProfile
        })

    } catch (error) {
        console.log(error)
        
    }

    
})
const addProject=asyncHandler(async(req,res)=>{
    const {name,link,technologies,description}=req.body
    console.log('project data:',req.body)
    try {
        const profile= await Profile.findOne({_id:req.params.id})
        if(!profile)
        {
            res.status(400)
            throw new Error('profile not found....')
        }
        const newProject={
            name,
            link,
            technologies,
            description
             
       }
       profile.projects.push(newProject)
        await profile.save()
        console.log(profile)
        res.status(200).json({
            message:'profile aktuallisiert...',
            profile
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Server: an Error occured '})
        
    }

})
const deleteOneProject=asyncHandler(async(req,res)=>{
      try {
        
         const fetchedProfile=await Profile.findOne({_id:req.params.id})
        
         fetchedProfile.projects.splice(req.params.index,1)
         await fetchedProfile.save()
        res.status(200).json({
            message:'Project wurde deleted...',
            profile:fetchedProfile
        })

    } catch (error) {
        console.log(error)
        
    }

    
})
module.exports={
   addeducation,deleteOneeducation, addcareer,addOneCareer,getProfile,deleteOneCareer,addSkill,deleteOneSkill,deleteOneProject,addProject
}