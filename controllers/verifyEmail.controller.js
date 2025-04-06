import User from "../models/User.model.js"
import {refreshToken,token } from "../utills/jwtUtills.js"
const verifyEmail = async (req,res)=>{
   try {
     const {verficationToken} = req.params
 
     const user = await User.findOne({verficationToken:verficationToken})
     console.log(user);
     
     if(!user){
         return res.status(400).json({message:"user is not found"})
     }
     user.verficationToken = null
     user.isVerified = true
       
     const accessToken = token(user)
     const generaterefreshToken = refreshToken(user)
     user.refreshToken = refreshToken

     await user.save()

     res.cookie("refreshtoken",generaterefreshToken)
 
     res.status(200).json({message:"Email verified successfully",accessToken})

   } catch (error) {
          console.error("user is not verified check your Email!",error)
    
   }
}

export default verifyEmail;