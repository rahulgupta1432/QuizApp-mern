import Question from "../model/questionModel.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendResponse from "../utils/SendResponse.js";



export const getAllTopics=async(req,res,next)=>{
    try {
        const getTopics=await Question.find().select('topic _id')
        if(!getTopics||getTopics.length===0){
            sendResponse({
                res,
                message:'No Topics Found',
                data:[]
            })
        }
        sendResponse({
            res,
            message: "Topics Fetch Successfully",
            data: getTopics
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}



export const getSelectedQuestionDetails = async (req, res, next) => {
    try {
        const {topicName,topicIds}=req.body;

        // Find questions by topic
        const questions = await Question.find({
            $or:[
                {topic:topicName},
                { _id: { $in: topicIds } } // Use $in to check against the array
            ]
        }).exec();
        
        // Check if any questions were found
        if (!questions || questions.length === 0) {
            return next(new ErrorHandler("No questions found for this topic", 404));
        }

        // Pagination setup
        const totalQuestions = questions.length; // Total questions available for the topic
        const page = Number(req.query.page) || 1; // Current page
        const limit = 1; // Limit to 1 question per page

        // Calculate the starting index for the current page
        const startIndex = (page - 1) * limit;
        const question = questions[startIndex]; // Get the question for the current page

        // If the question doesn't exist for the current page, return a 404
        if (!question) {
            return next(new ErrorHandler("Question not found for this page", 404));
        }

        const pagination = {
            limit,
            page,
            pages: Math.ceil(totalQuestions / limit),
            nextPage: page < Math.ceil(totalQuestions / limit) ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(totalQuestions / limit)
        };
        questions.push(pagination)

        // Send response with the question and pagination info
        sendResponse({
            res,
            message: "Question fetched successfully",
            data: questions,
            pagination,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};


export const SubmitQuizAnswers = async (req, res, next) => {
    try {
        const { userId, answers } = req.body; // { userId, answers: [{ questionId, answer }] }
        const user = await User.findById(userId);
        let score = 0;

        // Validate answers and calculate score
        const validatedAnswers = await Promise.all(
            answers.map(async ans => {
                const question = await Question.findById(ans.questionId);
                if (question && ans.answer === question.answer) {
                    score++;
                }
                return { questionId: ans.questionId,question:question.question, answer: ans.answer, isCorrect: question && ans.answer === question.answer };
            })
        );

        user.scores.push({ score, date: new Date() });
        await user.save();

        // sendResponse({
        //     res,
        //     message: "Quiz answers submitted successfully",
        //     data: arr
        // });

        return res.status(200).json({
            status: 'success',
            code:200,
            mesage:'Quiz answers submitted successfully',
            data:[{score,validatedAnswers}]
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};



export const getLeaderBoard=async (req, res,next) => {
    try {
        // Retrieve users and their total scores
        const users = await User.find().select('email scores').lean();

        // Calculate total score for each user
        const leaderboard = users.map(user => ({
            email: user.email,
            totalScore: user.scores.reduce((total, scoreEntry) => total + scoreEntry.score, 0),
        }));

        // Sort by total score in descending order and limit to top 10
        leaderboard.sort((a, b) => b.totalScore - a.totalScore);

        // res.status(200).json({
        //     status: "success",
        //     data: leaderboard.slice(0, 10) // Get top 10 users
        // });
        sendResponse({
            res,
            message: "Leaderboard Fetch Successfully",
            data: leaderboard
        })
    } catch (error) {
        return next(new ErrorHandler(error.mesage,500));
    }
}


export const getUserProfile=async(req,res,next)=>{
    try {
        const getUser=await User.findById(req.query.userId);
        if(!getUser){
            return next(new ErrorHandler("User not found",400));
        }
        sendResponse({
            res,
            message: "User Fetch Successfully",
            data: getUser
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}



export const updateUserProfile=async(req,res,next)=>{
    try {
        const {userId,email}=req.body;
        const getUser=await User.findById(userId);
        if(!getUser){
            return next(new ErrorHandler("User not found",400));
        }
        getUser.email=email;
        await getUser.save();
        sendResponse({
            res,
            message: "User Profile Updated Successfully",
            data: []
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}




