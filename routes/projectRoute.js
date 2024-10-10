import express from "express";
import { Auth } from "../middleware.js/authMiddleware.js";
import { getAllTopics, getLeaderBoard, getUserProfile, updateUserProfile } from "../controller/UserController.js";

const router=express.Router();

router.get('/all-topics',getAllTopics);

router.get('/leaderboard',getLeaderBoard);

router.get('/get-profile',getUserProfile);

router.put('/update-profile',updateUserProfile);



export default router;