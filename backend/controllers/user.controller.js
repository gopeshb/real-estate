import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test=(req,res)=>{
    res.send("dhat teri maa ki....")
}
export const updateUser= async (req,res,next)=>{
    if (req.user.id !== req.params.id) 
        return next(errorHandler(401, 'Unauthorized: You do not have permission to update this user.'));
    try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new: true})
        const {password:pass,...rest}=updatedUser;
        res.status(200).json({ message: 'User updated successfully.', data: rest });
    } catch (error) {
        next(error);
    }
}