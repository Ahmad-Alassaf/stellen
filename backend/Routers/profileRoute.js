const express=require('express')
const {addeducation,deleteOneeducation, addcareer,addOneCareer,getProfile,deleteOneCareer,addSkill,deleteOneSkill,deleteOneProject,addProject}=require('../Controllers/profileController')
const protectRoute =require('../Middleware/authMiddleware')
const router=express.Router()
router.get('/:id',protectRoute,getProfile)//:id-> profile._id
// Career Route
router.post('/careerhistory/addcareer',protectRoute,addcareer)
router.put('/careerhistory/:id',protectRoute,addOneCareer)//:id profile._id
router.delete('/careerhistory/:id/:index',protectRoute,deleteOneCareer)
// Education Route

router.put('/education/:id',protectRoute,addeducation)//:id profile._id
router.delete('/education/:id/:index',protectRoute,deleteOneeducation)//: profile Id and eduction stage index
//Skills
router.put('/skills/:id',protectRoute,addSkill)//:id profile._id
router.delete('/skills/:id/:index',protectRoute,deleteOneSkill)//: profile Id and eduction stage index
//Skills
router.put('/projects/:id',protectRoute,addProject)//:id profile._id
router.delete('/projects/:id/:index',protectRoute,deleteOneProject)//: profile Id and eduction stage index
module.exports=router