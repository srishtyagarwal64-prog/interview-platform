import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
       const token = localStorage.getItem("accessToken");
      await axios.post("/api/auth/logout",{} ,
        {
         headers: {
        Authorization: `Bearer ${token}`,
      },
        
    });

      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-[#f3f3f3] px-4 sm:px-6 lg:px-10 pt-5">

      {/* NAVBAR */}
      <nav
        className="
          w-full
          max-w-[1350px]
          mx-auto
          bg-white
          border border-gray-200
          rounded-[22px]
          shadow-[0_3px_15px_rgba(0,0,0,0.06)]
          px-6
          sm:px-8
          lg:px-10
          py-4
          sm:py-5
          flex
          items-center
          justify-between
          relative
        "
      >

        {/* LEFT */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* LOGO */}
          <div
            className="
              w-11
              h-11
              bg-black
              text-white
              rounded-xl
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            <BsRobot size={21} />
          </div>

          {/* BRAND */}
          <h1 className="font-semibold text-xl sm:text-2xl tracking-tight">
            InterviewIQ<span className="text-gray-500">.AI</span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* CREDITS */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }

                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="
                h-10
                px-4
                flex
                items-center
                gap-2
                bg-gray-100
                border border-gray-200
                rounded-full
                text-sm
                font-medium
                hover:bg-gray-200
                transition
              "
            >
              <BsCoin size={17} />

              <span>
                {userData?.credits || 0}
              </span>
            </button>

            {/* CREDIT POPUP */}
            {showCreditPopup && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-3
                  w-64
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-xl
                  p-5
                  z-50
                "
              >
                <p className="text-sm text-gray-600 mb-4">
                  Need more credits to continue interviews?
                </p>

                <button
                  onClick={() => navigate("/pricing")}
                  className="
                    w-full
                    bg-black
                    text-white
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    hover:bg-gray-800
                    transition
                  "
                >
                  Buy more credits
                </button>
              </div>
            )}
          </div>

          {/* USER */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }

                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className="
                w-10
                h-10
                bg-black
                text-white
                rounded-full
                flex
                items-center
                justify-center
                font-semibold
                hover:bg-gray-800
                transition
              "
            >
              {userData?.name ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>

            {/* USER POPUP */}
            {showUserPopup && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-3
                  w-52
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-xl
                  p-4
                  z-50
                "
              >
                <p className="text-sm text-blue-500 font-semibold mb-2">
                  {userData?.name}
                </p>

                <button
                  onClick={() => navigate("/history")}
                  className="
                    w-full
                    text-left
                    text-sm
                    py-2
                    text-gray-600
                    hover:text-black
                  "
                >
                  Interview History
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    text-left
                    text-sm
                    py-2
                    flex
                    items-center
                    gap-2
                    text-red-500
                    hover:text-red-600
                  "
                >
                  <HiOutlineLogout size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModel
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}

export default Navbar;