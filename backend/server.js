import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import  connectdb from './common/config/db.js'
import authRoutes from "./module/auth/authroutes.js";
import interviewRoutes from "./module/Interview/Interviewroutes.js";
import paymentroutes from "./module/payment/paymentroutes.js";
const app= express()

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/interview",interviewRoutes);
app.use("/api/payment",paymentroutes);
const PORT= process.env.PORT||3000;

app.get("/",(req,res)=>{
    res.send("Api is working")
})

const start = async()=>{
     await connectdb()
    app.listen(PORT,()=>{
        console.log(`server is working on http://localhost:${PORT}`)
    })
}
start().catch((err)=>{
    console.error("error is",err)
    process.exit(1)
})