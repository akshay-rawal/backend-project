import jwt from 'jsonwebtoken'

export const authenticate = (req,res,next)=>{
try {   
        const token =  req.cookies?.token
         console.log(req.cookies);
         console.log("token found:",token? "yes":"no");
         if(!token){
            console.log("no Token");
            return res.status(401).json({
                sucess:false,
                message:"Authentication Failrd"
            })

            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            
         }
         
      
} catch (error) {
    
}
}