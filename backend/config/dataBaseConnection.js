const mongoose=require('mongoose')
const connectDataBase=async()=>{
    try {
      const conn=await  mongoose.connect(process.env.MONGOOSE_URI)
      console.log(`Server connected with Data Base :${conn.connection.host}`.cyan.underline)
        
    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }
}
module.exports=connectDataBase

