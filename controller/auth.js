import { loginValidation, registerUserValidation } from "../helper/validation.js";
import generateToken from "../middleware.js/generateToken.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendResponse from "../utils/SendResponse.js";


const registerUser=async(req,res,next)=>{
    try {
        const { email,password,topics,scores } = req.body;
        const valid=await registerUserValidation(req.body);
        if(!valid||(valid&&valid.error)){
            return next(new ErrorHandler(valid.error,400));
        }
        const checkExist=await User.findOne({email:email});
        if(checkExist){
            return next(new ErrorHandler("Email Already Existed",400));
        }
        
        const user= await User.create({
            email,
            password,
            topics,
            scores
        })
        user.password=undefined;
        const data={...user.toObject()}
        sendResponse({
            res,
            message: "User Register Successfully",
            data: data,
          });
          
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
}


const loginUser=async(req,res,next)=>{
    try {
        const { email,mobile,password } = req.body;
        const valid=await loginValidation(req.body);
        if(!valid||(valid&&valid.error)){
            return next(new ErrorHandler(valid.error,400));
        }
        const user=await User.findOne({$or:[
            {email},
            {mobile}
        ]});
        if(!user){
            return next(new ErrorHandler("User not found",400));
        }
        const checkPassword=await user.comparePassword(password);
        if(!checkPassword){
            return next(new ErrorHandler("Password Is Incorrect",400));
        }
        const token=await generateToken(user.id,user.tokenVersion);
        user.password=undefined;
        const data={...user.toObject(),token}
        sendResponse({
            res,
            message: "User Login Successfully",
            data: data,
          });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
}


export {
    registerUser,
    loginUser
}