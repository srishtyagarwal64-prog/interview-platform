import express from "express"
import { AuthMiddleWare } from "../../common/middleware/authmidleware.js";
import { createOrder, verifyPayment } from "./paymentcontroller.js";



const router = express.Router()

router.post("/order" , AuthMiddleWare , createOrder )
router.post("/verify" , AuthMiddleWare , verifyPayment )


export default router;