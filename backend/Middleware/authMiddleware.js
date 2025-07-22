const asyncHandler=require('express-async-handler')
const jwebtoken=require('jsonwebtoken')
const protectRoute=asyncHandler(async(req,res,next)=>{
    const token=req.header('Authorization')

   
    if(!token)
    {
        res.status(401)
        console.log('there is no Token from Frontend')
        throw new Error('Access denied !!!!')
    }
    try {
        const verfiedUser=jwebtoken.verify(token.split(' ')[1],process.env.JWT_SECRET)
        req.user=verfiedUser
        next()
        
    } catch (error) {
        
        throw new Error(' Token expired !!!! ')
        
    }

})
module.exports=protectRoute