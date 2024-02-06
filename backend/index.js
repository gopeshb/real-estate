import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to database successfully');
}).catch((error)=>{
console.log(error)
});
const app=express();
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running at PORT no. ${PORT}`)
});
app.get('/',(req,res)=>{
    res.send("hello from backend");
})
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});