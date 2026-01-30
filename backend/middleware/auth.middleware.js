import jwt from "jsonwebtoken";
import cacheInstance from "../services/cache.services.js";
import { UserModel } from "../model/user.model.js";

export const authMiddleWare = async (req , res , next)=> {
    try {
        let token = req.cookies?.token;

        if(!token){
            return res.status(401).json({
                message: "Unauthorized access , token not found"

            })
        }

        const isBlacklisted = await cacheInstance.get(token)
        if(isBlacklisted){
            return res.status(401).json({
                message: "Token is blacklisted ,unauthorized access"
            })
        }

        const decode = jwt.verify(token , process.env.Jwt_Secret_Key)
        if(!decode || !decode.id){
            return res.status(401).json({
                message: "invalid token !unauthorized "
            })
        }

        const user = await UserModel.findById(decode.id).select('-password -verificationToken')
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        req.user = user;

        next()

        


         
    } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
        message: "Invalid or expired token"
    })
    }
}