const express=require('express')
const multer = require('multer')
const upload = require("../Middleware/uploadMiddleware"); // Import middleware
const {getMyJobs,getJobs,getOneJob,setJob,deleteJob, addJob,getRecomendedJobs,like,pulllike,savingJob,unsavingJob,addCandidate} =require('../Controllers/jobController')
const router=express.Router()

const protectRoute =require('../Middleware/authMiddleware')
router.get('/myjobs/:limit/:currentPage',protectRoute,getMyJobs)// only my jobs
router.get('/:limit',getJobs)// all jobs
router.get('/job/:id',getOneJob) // One Job
router.get('/recomendedjobs/:id',protectRoute,getRecomendedJobs)
router.get('/candidate/:id',protectRoute,addCandidate)//:id is Job id 
router.post('/givelike/:id',protectRoute,like)
router.post('/pulllike/:id',protectRoute,pulllike)
router.post('/saveJob/:id',protectRoute,savingJob)
router.post('/unsaveJob/:id',protectRoute,unsavingJob)
router.post('/',upload.single('file'),protectRoute,addJob)
router.put('/:id',upload.single('file'),protectRoute,setJob)
router.delete('/:id',protectRoute,deleteJob)

module.exports= router