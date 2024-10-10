import express from "express";
import { getSelectedQuestionDetails, SubmitQuizAnswers } from "../controller/userController.js";
import { Auth } from "../middleware.js/authMiddleware.js";
import fs from 'fs';
import path from 'path';


const router=express.Router();


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const controllerPath = path.join(process.cwd(), 'controller');


try {
    const files = fs.readdirSync(controllerPath);
    console.log('Controller Files:', files);
} catch (error) {
    console.error('Error reading controller directory:', error);
}

router.post('/selected-question/:topic',Auth,getSelectedQuestionDetails);

// router.post('/submit-quiz',Auth,SubmitQuizAnswers);
router.post('/submit-quiz', Auth, async (req, res, next) => {
    console.log(req.body); // Request body log karo
    await SubmitQuizAnswers(req, res, next);
});




// console.log(fs.readdirSync(controllerPath));



export default router;