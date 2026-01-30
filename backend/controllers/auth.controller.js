import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../model/user.model.js';
import cacheInstance from '../services/cache.services.js';

export const registerAuthController = async (req , res)=> {
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

        let user = await  UserModel.create({
            name,
            email,
            mobile,
            password: hashPass,

        })

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
                mobile: user.mobile
            },
            token,
        })

        

    } catch (error) {
        console.log('error ->',error)
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
            message: "All fields are required"
        })
      }

      let user = await UserModel.findOne({email});
      if(!user){
        return res.status(404).json({
            message: "user not found , please register"
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
        secure: false, 
        sameSite: "lax"
      })

      return res.status(200).json({
        message:"user logged in successfully",
        user,
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