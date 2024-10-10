import express from "express";
import { Auth } from "../middleware.js/authMiddleware.js";
import { getAllTopics, getLeaderBoard, getUserProfile, updateUserProfile } from "../controller/UserController.js";

const router=express.Router();

router.get('/all-topics',getAllTopics);

router.get('/leaderboard',Auth,getLeaderBoard);

router.get('/get-profile',getUserProfile);

router.put('/update-profile',Auth,updateUserProfile);



export default router;