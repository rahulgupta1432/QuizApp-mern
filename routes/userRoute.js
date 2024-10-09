import express from "express";
import {  SelectTopicsByUserId } from "../controller/userController.js";
import { Auth } from "../middleware.js/authMiddleware.js";

const router=express.Router();

router.post("/select",Auth,SelectTopicsByUserId);


export default router;