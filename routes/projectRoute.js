import express from "express";
import {   getAllTopics, getLeaderBoard, getUserProfile, updateUserProfile } from "../controller/userController.js";
import { Auth } from "../middleware.js/authMiddleware.js";

const router=express.Router();

router.get('/all-topics',getAllTopics);
router.get('/leaderboard',getLeaderBoard);

router.get('/get-profile',getUserProfile);

router.put('/update-profile',updateUserProfile);


// router.post("/select",Auth,SelectTopicsByUserId);

// router.get("/profile",Auth,getUserProfile);



export default router;