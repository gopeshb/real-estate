import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to database successfully');
}).catch((error)=>{
console.log(error)
});
const app=express();
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running at PORT no. ${PORT}`)
});
app.get('/',(req,res)=>{
    res.send("hello from backend");
})
app.use("/api/user",userRouter);