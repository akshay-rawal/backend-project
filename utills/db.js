
import dotenv from 'dotenv'

dotenv.config()

import mongoose from "mongoose"

const db = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    
    .then(()=>{console.log("sucessfully connect to mongoDB")})
    .catch(()=>{console.log("error to connect mongoDB")})
    console.log("Loaded MONGO_URL:", process.env.MONGO_URL)  
}

export default db;


