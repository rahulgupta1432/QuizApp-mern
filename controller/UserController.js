import Question from "../model/questionModel.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendResponse from "../utils/SendResponse.js";

export const SelectTopicsByUserId=async(req,res,next)=>{
    try {
        const {topics}=req.body;
        const user=await User.findById(req.user.id);
        user.topics=topics;
        await user.save();
        user.password=undefined;
        sendResponse({
            res,
            message: "Topics Updated Successfully",
            data: []
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
}



export const getQuestionByTopic=async(req,res,next)=>{
    try {
        const questions = await Question.find({ topic: req.params.topic });
        sendResponse({
            res,
            message: "Topics Fetch Successfully",
            data: questions
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
}


