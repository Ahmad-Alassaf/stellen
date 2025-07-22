const express=require('express')
const {addfeedback,deleteFeedback,getFeedbacks }=require('../Controllers/feedbackController')

const router=express.Router()
router.get('/',getFeedbacks)
router.post('/',addfeedback)
router.delete('/:id',deleteFeedback)
module.exports=router
