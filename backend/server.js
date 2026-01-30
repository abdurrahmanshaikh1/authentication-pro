
import dotenv from "dotenv";
dotenv.config();
import {router as authRouter}  from "./routes/auth.route.js"
import profileRouter  from "./routes/profile.route.js"
import express from 'express'
import { connectDB } from './config/db.js'
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const PORT = 3000

connectDB()
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

app.use('/api/auth', authRouter )
app.use('/api/profile',profileRouter)
app.listen(PORT, ()=>{
    console.log('server is running on',PORT)
})