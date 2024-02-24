import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide valid values for username, email, and password.' });
    }
    try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username is already taken. Please choose another.' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, 
                message: 'Email is already registered. Please use another email address.' });
        }
        
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
};
export const signin=async (req,res,next)=>{
    const { email,password } = req.body;
    if (!email || !password){
        return res.status(400).json({ success: false, message: 'Please provide valid values for username, email, and password.' });}
    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(401,'Invalid email. User not found.'));
        }
        
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,"Wrong credentials!"));
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true,expires: new Date(Date.now()+24*60*60*1000)})
        .status(200).json(rest);
    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
}
export const google =async (req,res,next)=>{
    try{
        const user =await User.findOne({email:req.body.email});
        if(user){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=user._doc;
        res.cookie('access_token',token,{httpOnly:true,expires: new Date(Date.now()+24*60*60*1000)})
        .status(200).json(rest);
        }else{
            const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
        const newUser = new User({ username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8)
        , email:req.body.email, password: hashedPassword,avatar:req.body.photo });
        
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=newUser._doc;
        res.cookie('access_token',token,{httpOnly:true,expires: new Date(Date.now()+24*60*60*1000)})
        .status(200).json(rest);
        }
    }catch(error){
        next(error);
    }
}
export const signout=async(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');
    } catch (error) {
        next(error);
    }
}