import express from "express";
import { getSelectedQuestionDetails, SubmitQuizAnswers } from "../controller/userController.js";

const router=express.Router();


// router.get('/:topic', );

router.post('/selected-question/:topic',getSelectedQuestionDetails);

router.post('/submit-quiz',SubmitQuizAnswers);


export default router;