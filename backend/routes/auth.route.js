import express from 'express'
import { loginAuthController, logoutAuthController, registerAuthController, verifyEmailController } from '../controllers/auth.controller.js'
import { authMiddleWare } from '../middleware/auth.middleware.js'

export const router = express.Router()

router.post('/register', registerAuthController)
router.post('/login', loginAuthController)
router.post('/logout' , logoutAuthController)



router.get('/current-user' , authMiddleWare , (req , res)=> {
   return res.status(200).json({
        message: "current user fetched",
        user:req.user
    })
} )

router.get('/verify-email/:token', verifyEmailController)
