import User from "../models/User.model.js"
import { comparePassword} from "../utills/bcryptPassword.js"
import { token,verifyRefreshToken,verifyToken,refreshToken } from "../utills/jwtUtills.js"


const userLogin = async (req,res)=>{
   try {
          const {email,password} = req.body
         const oldRefreshToken = req.cookies.refreshToken || null

          console.log("password",password);
          

          const user = await User.findOne({email})
          console.log("db password:",user.password);
          console.log("apna user:",user);
          
          if(!user){
            return res.status(400).json({message:"Invalid credentials!"})

          }

          
           const isMatch =  comparePassword(password,user.password)
          
          if(!isMatch){
            return res.status(400).json({message:"user is invalid!"})
          }
          //agar token already hai toh usko verify karna
          let newRefreshToken = oldRefreshToken;
          let decodedRefreshToken;
        
          try {
              decodedRefreshToken = verifyRefreshToken(oldRefreshToken);
              if (decodedRefreshToken.id !== user._id.toString()) {
                  throw new Error("Invalid token");
              }
          } catch (error) {
              // If token is missing or invalid, generate a new one
               newRefreshToken = refreshToken(user);
          }
          console.log("newRefreshToken:",newRefreshToken)

                const authToken = token(user)
                console.log("authToken",authToken);
                
                if(newRefreshToken !== oldRefreshToken){
                user.refreshToken = newRefreshToken
                console.log("refreshToken",user.refreshToken);
                
                await user.save()}
                res.cookie("refreshtoken",newRefreshToken, {httpOnly: true})

                res.status(200).json({ message: "Login successful", token: authToken });

   } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
}

export default userLogin;



