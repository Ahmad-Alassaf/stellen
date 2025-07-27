
const Job = require('../Models/jobModel');
const Profile=require('../Models/profileModel')
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const { json } = require('stream/consumers');
// Add Job (Fixed)
const addJob = asyncHandler(async (req, res) => { 
    console.log('add job controller called....')
   
    try {    
            const { title,companyName,category, description, type, work,workingdays, salary,tasks,skills,languages,performances, location,adresse } = req.body
            console.log('req.body')
             console.log(req.body)
             console.log(req.file)
            if (!title || !description || !salary || !type || !work || !location || !category  ) 
                {
                if (req.file) {
                                    try {
                                        await fs.promises.unlink(req.file.path); // Delete file asynchronously

                                    } catch (err) {
                                        return res.status(500).json({ message: 'File deletion failed' });
                                    }
                            }
                return res.status(400).json({ message: 'Please fill all fields. Photo would not saved...' });  
            }
          const newJob = await Job.create({
            title,
            companyName,
            description,
            type: JSON.parse(type || "null"), // Handle JSON parsing
            work: JSON.parse(work || "null"), // Handle JSON parsing
            workingdays:JSON.parse(workingdays || "null"),
            tasks:JSON.parse(tasks || "null"),
            skills:JSON.parse(skills|| "null"),
            languages:JSON.parse(languages|| "null"),
            performances:JSON.parse(performances ||'null'),
            salary:JSON.parse(salary ||'null'),
            adresse:JSON.parse(adresse ||'null'),
            location,
            imageUrl: `/uploads/${req.file.filename}`, // Save file path
            likes: [],
            candidateList:[],
            user: req.user.id,
            category:category
          })

          console.log('created Job is')
            console.log(newJob)
          res.status(201).json(newJob);
    } catch (error) {
        console.log(error)
      res.status(400).json(error)
    }
})
const getOneJob=asyncHandler(async(req,res)=>{
    try {
        const job=await Job.findOne({_id:req.params.id}).populate('user')
        console.log('Backend: getOneJob function ',job)
        if(!job)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
       res.status(200).json(job)

    } catch (error) {
        console.log(error)

    }

})
// get all Jobs  for user 
const getMyJobs=asyncHandler(async(req,res)=>{
    //const page = parseInt(req.params.currentPage) || 1;
            const limit = parseInt(req.params.limit) || 10;
          //  const skip = (page - 1) * limit;
    try {
        const jobs=await Job.find({user:req.user.id}).sort({ createdAt: -1 }).limit(limit).populate('user')
        if(!jobs)
            {
                res.status(401)
                throw new Error(' no Jobs ....')
            }
            const total = await Job.countDocuments();
       res.status(200).json({
        jobs,
       // totalPages:Math.ceil(total/limit),
        //currentPage:page
       })

    } catch (error) {
        console.log(error)

    }
})
// get all Jobs  for Homepage
const getJobs=asyncHandler(async(req,res)=>{
           // const page = parseInt(req.params.currentPage) || 1;
            const limit = parseInt(req.params.limit) || 10;
            const filters=req.query.filters
            const filterArray = filters ? filters.split(',') : []
           
           // const skip = (page - 1) * limit;
    try {
        //const jobs=await Job.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user')
                        const query = {};

                if (filterArray.length > 0) {
                    query.category = { $in: filterArray };
                }
                if (Object.keys(query).length > 0) {
                    // Query object has at least one property
                     const jobs=await Job.find(query).sort({ createdAt: -1 }).limit(limit).populate('user')
                      if(!jobs)
                                {
                                    res.status(401)
                                    throw new Error(' no Jobs ....')
                                }
                          const total = await Job.countDocuments();
                        res.status(200).json({
                            jobs,
                                                        // totalPages:Math.ceil(total/limit),
                                //  currentPage:page
                                })  
                      
                    }
                    else{
                         const jobs=await Job.find().sort({ createdAt: -1 }).limit(limit).populate('user')
                           if(!jobs)
                                {
                                    res.status(401)
                                    throw new Error(' no Jobs ....')
                                }
                          const total = await Job.countDocuments();
                        res.status(200).json({
                            jobs,
                                                        // totalPages:Math.ceil(total/limit),
                                //  currentPage:page
                                })  

                    }
        
       
            
    } catch (error) {  }   
})
const setJob=asyncHandler(async(req,res)=>{
    try {
        const { title,category,companyName, description, type, work,workingdays, salary,tasks,skills,languages,performances, location,adresse } = req.body
        const job=await Job.findOne({_id:req.params.id,user:req.user.id})
       
        if(!job)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        const photoPath =req.file? `/uploads/${req.file.filename}`:job.imageUrl
        const modefiedJob=await Job.findByIdAndUpdate(job._id,{
            title:title,
            companyName:companyName,
            description:description,
            type: JSON.parse(type || "null"), // Handle JSON parsing
            work: JSON.parse(work || "null"), // Handle JSON parsing
            workingdays:JSON.parse(workingdays || "null"),
            tasks:JSON.parse(tasks || "null"),
            skills:JSON.parse(skills|| "null"),
            languages:JSON.parse(languages|| "null"),
            performances:JSON.parse(performances ||'null'),
            salary:JSON.parse(salary ||'null'),
            adresse:JSON.parse(adresse ||'null'),
            location,
            imageUrl: photoPath, // Save file path
            imageUrl: photoPath, // Save file path
            likes: [],
            user: req.user.id,
            category:category

        })
      
        
       console.log('Backend: setJob Function called and modefied Job',modefiedJob)
       res.status(200).json(modefiedJob)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong", error: error.message })
        
    }

})
const deleteJob=asyncHandler(async(req,res)=>{
    try {
        const job=await Job.findOne({_id:req.params.id,user:req.user.id})
        if(!job)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        const deletedJob=await Job.findByIdAndDelete(job._id)
       res.status(200).json(deletedJob)
        
    } catch (error) {
        
    }
})
const like=asyncHandler(async(req,res)=>{
   
    const job=await Job.findOne({_id:req.params.id})//get Job from database
    console.log(job)// print Job later delete this line 
    try {
        const userId=req.user.id // get User ID that send request 
        const createdDate=Date.now()// only for date formating..
            job.likes.push({userId,createdDate})
        const likesList=job.likes.filter((like)=>like.userId)        
        const likedJob=await Job.findByIdAndUpdate(job._id,job)
       
        if(!likedJob)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        
    } catch (error) {
        console.log(error)
        
    }
    res.status(200).json(likedJob)

})
const pulllike=asyncHandler(async(req,res)=>{
  
    const job=await Job.findById(req.params.id)
   
    if(job){
     
        job.likes= job.likes.filter(like=>like.userId!==req.user.id)
        
        await job.save()       
        res.status(200).json(job)
    }
    else{
        res.status(401)
        throw new Error(' Job not Found !!!!')

    }

})
const savingJob=asyncHandler(async(req,res)=>{
  
    const job=await Job.findOne({_id:req.params.id})//get Job from database
   
    try {
        const userId=req.user.id // get User ID that send request 
        const createdDate=Date.now()// only for date formating..
        job.savedJobList.push({userId,createdDate})
           
        const savedJob=await Job.findByIdAndUpdate(job._id,job)
       
        if(!savedJob)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        res.status(200).json(savedJob)
        
    } catch (error) {
        console.log(error)
        
    }
   

})
const addCandidate=asyncHandler(async(req,res)=>{
    const job=await Job.findOne({_id:req.params.id})//get Job from database
   
    try {
        const userId=req.user.id // get User ID that send request 
      
        job.candidateList.push(userId)
           console.log(' job.candidateList', job.candidateList)
        const savedJob=await Job.findByIdAndUpdate(job._id,job)
        
       
       
        if(!savedJob)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        res.status(200).json({
            message:'candidateList updated',
            job:savedJob

        })
        
    } catch (error) {
        console.log(error)
        
    }

})
const unsavingJob=asyncHandler(async(req,res)=>{
    
    const job=await Job.findById(req.params.id)
   
    if(job){
     
        job.savedJobList= job.likes.filter(like=>like.userId!==req.user.id)
            
        await job.save()       
        res.status(200).json(job)
    }
    else{
        res.status(401)
        throw new Error(' Job not Found !!!!')

    }
})
const getRecomendedJobs=asyncHandler(async(req,res)=>{
    try {
        console.log('req.params',req.params)
        const fetchedProfile=await Profile.findOne({_id:req.params.id})
        const skillsList=fetchedProfile.skills.map(skill=>skill.name.trim())
        console.log('skillsList',skillsList)
        const recomendedjobs=await Job.find({
            skills:{$in:skillsList}
        })
        console.log('recomendedjobs',recomendedjobs)
        res.status(200).json(recomendedjobs)

        
    } catch (error) {
        console.log(error)
        
    }

})

module.exports={
    addJob,getMyJobs,getJobs,getOneJob,setJob,deleteJob,getRecomendedJobs,like,pulllike,unsavingJob,savingJob,addCandidate
}