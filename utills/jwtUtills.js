import jwt from "jsonwebtoken"

export const token = (user)=>{

    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"})
}

export const verifyToken = (token)=> {
         return jwt.verify(token,process.env.JWT_SECRET)
}

export const refreshToken = (user2)=>{
  return  jwt.sign({id:user2._id},process.env.REFRESH_JWT_SECRET,{expiresIn:"7d"})
}
export const verifyRefreshToken = (user3)=>{
    return  jwt.verify(user3,process.env.REFRESH_JWT_SECRET)
}
