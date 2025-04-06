import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './utills/db.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'



dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors({
    origin:process.env.BASE_URL,
    method:['GET','POST','DELETE','PUT'] ,     //common method
    credential:true,
    allowedHeaders:['content-type','Authorization']
    
})) 


db()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/v1/users',userRoutes)



app.listen(port,()=>{
  console.log(`server is running on ${port}`)
})