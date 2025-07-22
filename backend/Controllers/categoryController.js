const asyncHandler = require('express-async-handler');
const Category=require('../Models/jobCategoryModel');
const { model } = require('mongoose');
const addCategory=asyncHandler(async(req,res)=>{
    
    const {categoryTxt}=req.body
    
    if(!categoryTxt)
    {
        res.status(500).json({
            message:'there is no title for Category',
            category:null
        })
    }
    try {
        const category=await Category.create({
            category:categoryTxt
        })
        if(!category)
        {
             res.status(500).json({
                message:'an error occured in server ....',
                category:null
             })

        }
        res.status(200).json(category)
    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:'There is an Error occured in server... ',
            error:error
        })
        
    }

})
const getCategories=asyncHandler(async(req,res)=>{
    try {
        const categoryList=await Category.find()
        if(!categoryList)
        {
            res.status(200).json({
                message:'there is no Category jet',
                categoryList:null
            })
        }
        res.status(200).json({
            message:'',
            categoryList:categoryList
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'There is an Error occured in server... ',
            error:error
        })
        
    }

})
const deleteCategory=asyncHandler(async(req,res)=>{
    
    try {
        const category=await Category.findOne({_id:req.params.id})
       
        if(!category){
              
            res.status(500).json({
                message:'There is no Category',
                category:null
            })
        }
        const deletedCategory=await Category.findByIdAndDelete(category._id)
         
        res.status(200).json({
             
            message:'Categeory deleted successfully...',
            category:deletedCategory

        })
        
        
    } catch (error) {
        
        res.status(500).json({
            message:'An Error in server occured...',
            error:error
        })
        
    }
})
module.exports={
    addCategory,getCategories,deleteCategory
}