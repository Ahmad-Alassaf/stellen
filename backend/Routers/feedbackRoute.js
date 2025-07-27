const express=require('express')
const {addfeedback,deleteFeedback,getFeedbacks }=require('../Controllers/feedbackController')
const protectRoute =require('../Middleware/authMiddleware')
const router=express.Router()
router.get('/',getFeedbacks)
router.post('/',protectRoute,addfeedback)
router.delete('/:id',protectRoute,deleteFeedback)
module.exports=router
