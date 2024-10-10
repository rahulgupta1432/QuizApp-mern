import express from "express";
import { getSelectedQuestionDetails, SubmitQuizAnswers } from "../controller/userController.js";

const router=express.Router();


// router.get('/:topic', );

router.post('/selected-question/:topic',getSelectedQuestionDetails);

router.post('/submit-quiz',SubmitQuizAnswers);

// import fs from 'fs';
// import path from 'path';

// console.log(fs.readdirSync(path.join(__dirname, '../controller')));


export default router;