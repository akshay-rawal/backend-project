
import User from '../models/User.model.js'
import sendMail from '../utills/email.js'
import { token } from '../utills/crypto.js'
import ms from "ms"
import dotenv from 'dotenv'
dotenv.config()


const forgotPassword = async (req,res)=>{
try {
       const {email} = req.body
       const user = await User.findOne({email})
    
       if(!user)
        return res.status(404).json({message:'please provide email'})

        const resetPasswordToken = token()
    user.resetPasswordToken = resetPasswordToken    
     user.resetPasswordExpires = Date.now() + ms('30m')

        await user.save()

        const resetLink = `${process.env.BASE_URL}/api/v1/users/reset-password/${resetPasswordToken}`
        console.log("Generated Reset Link:", resetLink);
        console.log("Base URL from env:", process.env.BASE_URL);



       await  sendMail(email,resetLink,"reset")

        res.json("password reset email sent to you")
    
} catch (error) {
    res.status(500).json({message:"error sending reset email",error})
    
}}

export default forgotPassword