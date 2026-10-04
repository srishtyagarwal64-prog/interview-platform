import express from 'express';
import { register ,login,logout,getCurentUser } from "./authcontroller.js";
import { AuthMiddleWare } from "../../common/middleware/authmidleware.js";

 const router= express.Router();

 router.post("/register",register)

router.post("/login",login)

router.post("/logout",AuthMiddleWare,logout)
router.get("/curent-user", AuthMiddleWare,getCurentUser)

 export default router;