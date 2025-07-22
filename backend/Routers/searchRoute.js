const express=require('express')
const {search} =require('../Controllers/searchController')

const router=express.Router()
router.get('/:title/:city?',search)
module.exports=router