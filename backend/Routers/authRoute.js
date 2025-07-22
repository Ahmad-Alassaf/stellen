const express=require('express')
const {register,login,getMe} =require( '../Controllers/authController')
const router=express.Router()
router.get('/getMe',getMe)
router.post('/register',register)
router.post('/login',login)
module.exports=router