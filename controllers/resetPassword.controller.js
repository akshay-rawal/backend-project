
    import User from '../models/User.model.js'
    import { token as generateToken} from '../utills/jwtUtills.js'
    import dotenv from 'dotenv'
    dotenv.config()

          const resetpassword = async (req,res)=>{
          try {

            const {newPassword} = req.body
            const {token} = req.params
            
            if(!token || !newPassword){

              return   res.status(400).json({message:"request is invalid"})
            }

            const user = await User.findOne({resetPasswordToken:token,resetPasswordExpires:{$gt:Date.now()}})
            if(!user){
              return res.status(400).json({message:"your session is expired"})
            }
            user.resetPasswordExpires = undefined
            user.resetPasswordToken = undefined

            await user.save()
            const authToken = generateToken(user)
            
            res.cookie("token", authToken)

        

            res.status(200).json({message:"reset password create successfully!"})
            
          } catch (error) {
            res.status(500).json({message:"server down",error})

          }


    }

    export default resetpassword;