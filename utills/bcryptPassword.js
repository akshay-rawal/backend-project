   import bcrypt from "bcryptjs";

   export const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(12)
     const hashedPassword = await bcrypt.hash(password,salt)

     return hashedPassword;
    }

    export const comparePassword = async (password,userPassword)=>{
       
             return await bcrypt.compare(password,userPassword)
  
          

    }
   

