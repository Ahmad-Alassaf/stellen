const express=require('express')
const {postComment,getComments}=require('../Controllers/commentController')
const protectRoute=require('../Middleware/authMiddleware')
const router=express.Router()
router.get('/:id',getComments)
router.post('/:id',protectRoute,postComment)
module.exports=router