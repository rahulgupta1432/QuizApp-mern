import express from "express";
import { getQuestionByTopic } from "../controller/userController.js";

const router=express.Router();

router.get('/:topic', getQuestionByTopic);


export default router;