import dotenv from "dotenv";
dotenv.config(); 


import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try {
        let res = await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS: 30000,
        })
        if(res){
            console.log('mongodb connected')
        }
    } catch (error) {
        console.error("MongoDB connection failed ❌");
        console.error(error.message)
    }
}