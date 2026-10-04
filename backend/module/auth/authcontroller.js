import express from 'express';
import ApiResponse from "../../common/utils/Api-response.js";
import * as authServices from "./authservices.js";

const register = async (req, res) => {
    const user = await authServices.register(req.body);
  ApiResponse.created(res, "Registration success", user);
  
}

const login=async(req,res)=>{
  const result = await authServices.login(req.body);
   ApiResponse.ok(res, "Login successfull", result);
}

const logout = async (req, res) => {
  await authServices.logout(req.user.id);
  ApiResponse.ok(res, "Logout Success");
};
const getCurentUser= async(req,res)=>{
  const result = await authServices.getCurentUser( req.user.id);
   ApiResponse.ok(res, "curent user found", result);
}
export { register,login, logout ,getCurentUser};