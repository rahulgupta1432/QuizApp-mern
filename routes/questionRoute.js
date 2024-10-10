import express from "express";
import { getSelectedQuestionDetails, SubmitQuizAnswers } from "../controller/userController.js";
import { Auth } from "../middleware.js/authMiddleware.js";

const router=express.Router();


// router.get('/:topic', );

router.post('/selected-question/:topic',Auth,getSelectedQuestionDetails);

router.post('/submit-quiz',Auth,SubmitQuizAnswers);

// import fs from 'fs';
// import path from 'path';

// console.log(fs.readdirSync(path.join(__dirname, '../controller')));


export default router;