    import express from "express"
    import resetpassword from "../controllers/resetPassword.controller.js"
    import { registerUser } from "../controllers/register.controller.js"
    import forgotPassword from "../controllers/forgotPassword.controller.js"
    import verifyEmail from "../controllers/verifyEmail.controller.js"
    import userLogin from "../controllers/login.controller.js"
    import generateRefreshToken from "../utills/generateRefreshToken.js"

    const router = express.Router()

    router.post("/register" ,registerUser)
    router.post('/reset-password/:token',resetpassword)
    router.post("/forgot-password" ,forgotPassword)
    router.get("/verify-email/:token",verifyEmail)
    router.post('/login',userLogin)
    router.get('/refresh-token',generateRefreshToken)



    export default router
