import express from 'express';
import { analyzeResume,finishInterview,submitAnswer , generateQuestion,getInterviewReport,getMyInterviews } from "./Interviewcontroller.js";
import { AuthMiddleWare } from "../../common/middleware/authmidleware.js";
import {upload  }  from   "../../common/middleware/multer.js";
 const router= express.Router();

 router.post("/resume",AuthMiddleWare,upload.single("resume"),analyzeResume)
router.post("/generate-questions",AuthMiddleWare, generateQuestion)
router.post("/submit-answer",AuthMiddleWare,submitAnswer)
router.post("/finish",AuthMiddleWare,finishInterview )

router.get("/get-interview",AuthMiddleWare,getMyInterviews)
router.get("/report/:id",AuthMiddleWare,getInterviewReport)
 export default router;