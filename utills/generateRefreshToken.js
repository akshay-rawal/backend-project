
import User from "../models/User.model.js"
import { token,verifyToken,verifyRefreshToken, refreshToken, } from "./jwtUtills.js"

const generateRefreshToken = async(req,res)=>{
    try {
        const oldRefreshtoken = req.cookies.refreshtoken
        if(!oldRefreshtoken){
            res.json({message:"user not valid to acccesss this application"})
        }

         
            const user = await User.findOne({refreshToken:oldRefreshtoken})
            if (!user) return res.status(401).json({message:"user no found"})
    
          const decodedVerifyRefreshToken = verifyRefreshToken(oldRefreshtoken)
           
          if(user._id.toString() !== decodedVerifyRefreshToken.id) return res.status(403).json({message: "User not valid..."})
    
          const newAccessToken = token(user)
          const newRefreshToken = refreshToken(user)
            
    
           user.refreshToken = newRefreshToken;
           await user.save()
    
                  res.cookie("refreshtoken",newRefreshToken,{httpOnly:true})
                  res.status(201).json({message:"yeh lo tumahara access token",accesstoken:newAccessToken,userid:user.id.toString()})
    } catch (error) {
              return res.status(400).json("user not found")
    }

}

export default generateRefreshToken;