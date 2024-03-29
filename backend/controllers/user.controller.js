import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Listing from "../models/listing.model.js";

export const test=(req,res)=>{
    res.send("hello bacchhooo ")
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
        const {password:pass,...rest}=updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'invalid request'));
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted successfully');
    } catch (error) {
      next(error);
    }
  };
  export const getUserListing=async (req,res,next)=>{
    if (req.user.id === req.params.id) {
        try {
          const listings = await Listing.find({ userRef: req.params.id });
          res.status(200).json(listings);
        } catch (error) {
          next(error);
        }
      } else {
        return next(errorHandler(401, 'You are not verified to view this listing'));
      }
  }
  export const getUser= async(req,res,next)=>{
    try {
      const user =await User.findById(req.params.id);
      if(!user){
        return res.status(404).send("user not found");
      }
      const {password:pass,...rest}=user._doc;
      res.status(200).json(rest);
    } catch (error) {
      res.status(500).send("please try again after some time")
    }
    

  }