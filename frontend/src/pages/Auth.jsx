import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Auth({onClose}){
   const dispatch = useDispatch();
      const [showPassword, setShowPassword] =useState(false)
      const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
   const handleSubmit = async  (e) => {
    e.preventDefault();
  try {
    if (isLogin) {
      const response = await axios.post(
        "/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", response.data);
       const acessToken=response.data.data.acessToken;
       localStorage.setItem("accessToken", acessToken);
      dispatch(setUserData(response.data.data.user));

onClose();
    } else {
      const response = await axios.post(
        "/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Register successful:", response.data);

      setIsLogin(true);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  } catch (error) {
    console.log(
     error.response?.data?.message || "Something went wrong"

    );
  }
  };
   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-gray-400 hover:text-gray-800"
        >
          ×
        </button>
<div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-2xl text-white shadow-lg">
            🤖
          </div>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome back " : "Create your account "}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {isLogin
              ? "Continue your AI interview preparation"
              : "Start preparing for your next interview"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 py-3 px-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 py-3 px-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 py-3 px-4 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3 font-semibold text-white shadow-md transition hover:from-emerald-700 hover:to-teal-600"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 font-semibold text-emerald-600 hover:text-emerald-700"
          >
            {isLogin ? "Create account" : "Login"}
          </button>
        </div>

      </div>
    </div>

  )
}
export default  Auth;