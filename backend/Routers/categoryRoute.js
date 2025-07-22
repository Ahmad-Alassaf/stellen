const express=require('express')
const { addCategory,getCategories,deleteCategory}=require('../Controllers/categoryController')
const protectRoute =require('../Middleware/authMiddleware')
const router=express.Router()
router.get('/',protectRoute,getCategories)
router.post('/',protectRoute,addCategory)
router.delete('/:id',protectRoute,deleteCategory)
module.exports=router
