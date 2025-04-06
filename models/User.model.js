import mongoose from 'mongoose'
import { hashPassword } from '../utills/bcryptPassword.js';

const userSchema = new mongoose.Schema({
      
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['user',"admin"],
        default:'user'
    },

    isVerified:{
        type:Boolean,
        default:false
    },
    verficationToken:{
        type :String
    },
    resetPasswordToken:{
        type : String
    },
    resetPasswordExpires: {
        type: Date,
      },
      refreshToken:{
        type:String
      }
},{timestamps:true}

)

userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next;
if (this.password) {
    try {
        
        this.password = await hashPassword(this.password)
    
    } catch (error) {
        console.log(error);  
        
    }
    
}})

const User = mongoose.model("User",userSchema)

export default User;