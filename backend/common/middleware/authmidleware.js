import { verifyAccessToken } from "../../common/utils/jwt-utils.js";
import ApiError from "../../common/utils/Api-error.js";
import User from "../../module/auth/authmodel.js";

const AuthMiddleWare= async (req,res,next)=>{
  let token;
    console.log("AUTH HEADER:", req.headers.authorization);
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("TOKEN:", token);
if(!token) 
    throw ApiError.unauthorized("not authenticated")
  const decoded = verifyAccessToken(token)
const user= await User.findById(decoded.id)
if(!user) 
    throw ApiError.unauthorized("user no longer exists")
  //yai user upr variable vala ni h
req.user=decoded;
next();
}

export { AuthMiddleWare };