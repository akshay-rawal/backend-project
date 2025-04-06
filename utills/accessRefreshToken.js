
  import {token,refreshToken,verifyToken} from "./jwtUtills"
  import User from "../models/User.model";

  
const accessRefreshToken = async (req,res)=>{
       const oldRefreshToken = req.cookies?.refreshToken
       if (!oldRefreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }
      const decodedRefreshToken =  refreshToken(oldRefreshToken)
      const accesstoken = token(decodedRefreshToken)



      

}

export default accessRefreshToken;