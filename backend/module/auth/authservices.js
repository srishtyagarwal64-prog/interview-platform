import ApiError from "../../common/utils/Api-error.js";
import User from "./authmodel.js";
import bcrypt from "bcryptjs";
import {  generateAccessToken,generateRefreshToken} from  "../../common/utils/jwt-utils.js";
import crypto from "crypto";

const register= async({name,email,password})=>{
    const existinguser = await User.findOne({email });
    if (existinguser) throw ApiError.conflict ("email already exists");

const hashedpassword = await bcrypt.hash(password, 10);

const user = await User.create({
    name,
    email,
    password: hashedpassword
});

const userObj = user.toObject();
  delete userObj.password;
  return userObj;

}
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const login = async ({email,password})=>{

const user = await User.findOne({email});
if(!user){
  throw ApiError.unauthorized("invalid email or password");
}
const  ispasswordCorrect=await bcrypt.compare(password,user.password);

if (!ispasswordCorrect)
throw ApiError.unauthorized("invalid email or password");

const acessToken = generateAccessToken({id: user._id} );
 const refreshToken = generateRefreshToken({id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

   const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

 return{user: userObj ,acessToken,refreshToken }

}
const logout = async (userId) => {
  //   const user = await User.findById(userId);
  //   if (!user) throw ApiError.unauthorized("User not found");

  //   user.refreshToken = undefined;
  //   await user.save({ validateBeforeSave: false });

  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
const getCurentUser =async(userId)=>{
  const user = await User.findById(userId);

    if (!user) 
      throw ApiError.notfound("User not found");
    return user;
    
}
export {register,login,logout,getCurentUser }