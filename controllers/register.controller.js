import User from "../models/User.model.js"
import { sendMail } from "../utills/sendMails.js";
import { token } from "../utills/crypto.js";
import dotenv from "dotenv"
import { hashPassword } from "../utills/bcryptPassword.js";
import  emailVerificationMailGenContent from "../utills/emailVerification.js"


dotenv.config()

const registerUser = async (req,res)=>{
    //get all data from body
    const {name,email,password} = req.body
    console.log("Password:", password)
    // data should be exit?
    if(!(name && email && password)){
       return  res.status(400).send("All field are mandatory")
    }

        //if user exit in database
     try {
       const exitingUSer =  await User.findOne({email})
       if(exitingUSer){
         return res.status(400).send("user already available")
       }
        // hash password
        const encryptedPassword = await hashPassword(password)
       //const encryptedPassword = await  hashPassword(password)
       console.log("encrypted password:",encryptedPassword);
       
        // verifcaion token for email
       const verficationToken = token()

       // create save new user in database 
         const user =  await User.create({
             name,
             password:encryptedPassword,
             email,
          verficationToken:verficationToken 
            })

           console.log("Request Body:", req.body);

           
           const verifyLink = `${process.env.BASE_URL}/api/v1/users/verify-email/${verficationToken}`
           console.log("verficationToken",verficationToken);
           
           console.log("📩 Sending mail to:", email, "with link:", verifyLink);

           await sendMail({
            subject:"welcome!",
            to:email,
            generatecontent:emailVerificationMailGenContent(name,verifyLink),
           
          })
           console.log("Sending email to:", email);


           res.status(200).json({message:"successfully created",
            name,
            email
      } )

 
     } catch (error) {
      console.error("error:",error)
     }
    }

export {registerUser}