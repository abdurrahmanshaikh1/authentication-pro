import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserModel } from '../model/user.model.js';
import cacheInstance from '../services/cache.services.js';
import { sendVerificationEmail } from './email.controller.js';

export const registerAuthController = async (req , res)=> {
    console.log(req.body)
    try {
        let {name , email , mobile , password} = req.body;
        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await UserModel.findOne({ 
            $or: [{email}, {mobile}] 
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email or Mobile already registered"
            });
        }

        let hashPass = await bcrypt.hash (password , 10);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        let user = await  UserModel.create({
            name,
            email,
            mobile,
            password:hashPass,
             isVerified: false, 
            verificationToken, 
            verificationTokenExpires: new Date(Date.now() + 3600000)

        })

        await sendVerificationEmail(email, verificationToken, name);

        let token = jwt.sign({id:user._id} , process.env.Jwt_Secret_Key , {
            expiresIn: '1h'
        })

         res.cookie("token" , token ,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
         })

        


        return res.status(201).json({
            message: "user registered succesfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isVerified: user.isVerified
            },
            token,
        })

    } catch (error) {
        console.log('error ->',error.response?.data || error.message)
        return res.status(500).json({
            message: "Error in register controller",
            error:error.message
        })
    }
}

export const loginAuthController = async (req , res)=> {
    try {
      let {email , password} = req.body;
      
      if(!email || !password){
        return res.status(400).json({
            message: "Email and password required"
        })
      }

      let user = await UserModel.findOne({email});
      if(!user){
        return res.status(404).json({
            message: "user not found , please register"
        })
      }

       if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email first! Check your inbox."
            })
        }

      let comparePass = await bcrypt.compare(password , user.password);
      if(!comparePass){
        return res.status(401).json({
            message: "invalid credentials"
        })
      }

      let token = jwt.sign({id:user._id} , process.env.Jwt_Secret_Key , {
        expiresIn: '1h'
      })

      res.cookie("token" , token , {
        httpOnly: true,
         secure: process.env.NODE_ENV === 'production', 
        sameSite: "lax"
      })

      return res.status(200).json({
        message:"user logged in successfully",
        user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isVerified: true
            },
        token,
      })
    } catch (error) {
        return res.status(500).json({
            message: "Error in login Controller",
            error,
        })
    }
}

export const logoutAuthController = async (req , res)=> {
    try {
        let {user_id} = req.body;

        if(!user_id){
            return res.status(404).json({
                message: "user id not found"
            })
        }

        let user = await UserModel.findById(user_id);
        if(!user){
            return res.status(401).json({
                message: "unauthorized access , user not found"
            })
        }

        let token = req.cookies.token
        
        await cacheInstance.set(token, "blacklisted")

        res.clearCookie('token');

        return res.status(200).json({
            message: "user logged out successfully",
            user,
        })
    } catch (error) {
        console.log('error->',error)
        return res.status(500).json({
            message: "Error in logout Controller",
            error,
        })
    }
}



export const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await UserModel.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid ya expired verification link"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        return res.status(200).json({
            message: "✅ Email verified successfully! Ab login kar sakte hain.",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Verification failed",
            error: error.message
        })
    }
}