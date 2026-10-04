import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { FaArrowLeft } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import axios from 'axios';
import { HiArrowNarrowLeft } from "react-icons/hi";
function Pricing(){
     const navigate = useNavigate()
      const [selectedPlan, setSelectedPlan] = useState("free");
      const [loadingPlan, setLoadingPlan] = useState(null);
      const dispatch = useDispatch()
    
      const plans = [
        {
          id: "free",
          name: "Free",
          price: "₹0",
          credits: 100,
          description: "Perfect for beginners starting interview preparation.",
          features: [
            "100 AI Interview Credits",
            "Basic Performance Report",
            "Voice Interview Access",
            "Limited History Tracking",
          ],
          default: true,
        },
        {
          id: "basic",
          name: "Starter Pack",
          price: "₹100",
          credits: 150,
          description: "Great for focused practice and skill improvement.",
          features: [
            "150 AI Interview Credits",
            "Detailed Feedback",
            "Performance Analytics",
            "Full Interview History",
          ],
        },
        {
          id: "pro",
          name: "Pro Pack",
          price: "₹500",
          credits: 650,
          description: "Best value for serious job preparation.",
          features: [
            "650 AI Interview Credits",
            "Advanced AI Feedback",
            "Skill Trend Analysis",
            "Priority AI Processing",
          ],
          badge: "Best Value",
        },
      ];
    
const handlePayment = async (plan) => {
  try {
    setLoadingPlan(plan.id);

    const amount =
      plan.id === "basic"
        ? 100
        : plan.id === "pro"
        ? 500
        : 0;
const token = localStorage.getItem("accessToken");
    const result = await axios.post( "/api/payment/order",
      {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },
      {
        headers: {
      Authorization: `Bearer ${token}`,
      },
    }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: result.data.amount,

      currency: "INR",

      name: "InterviewIQ.AI",

      description: `${plan.name} - ${plan.credits} Credits`,

      order_id: result.data.id,

      handler: async function (response) {
        try {
          const token = localStorage.getItem("accessToken");
          const verifyPay = await axios.post( "/api/payment/verify",
            response,
            {
              headers: {
      Authorization: `Bearer ${token}`,
    },
            }
          );

          dispatch(setUserData(verifyPay.data.user));

          alert("Payment Successful 🎉 Credits Added!");

          navigate("/");
        } catch (error) {
          console.log(error);
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#10b981",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();

    setLoadingPlan(null);

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Payment failed. Please try again."
    );

    setLoadingPlan(null);
  }
};

    return(


        
<div  className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {plans.map((plan) => (
    <div
      key={plan.id}
      className="border rounded-2xl p-6 shadow-md"
    >
      {/* Badge */}
      {plan.badge && (
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {plan.badge}
        </span>
      )}

      {/* Plan name */}
      <h2 className="text-2xl font-bold mt-4">
        {plan.name}
      </h2>

      {/* Price */}
      <p className="text-3xl font-bold mt-3">
        {plan.price}
      </p>

      {/* Description */}
      <p className="text-gray-500 mt-2">
        {plan.description}
      </p>

      {/* Credits */}
      <p className="mt-4 font-semibold">
        {plan.credits} Credits
      </p>

      {/* Features */}
      <ul className="mt-5 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index}  className="flex items-center gap-2">
            <HiCheck /> 
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
     {!plan.default &&<button
         onClick={() => handlePayment(plan)}
    disabled={loadingPlan === plan.id}
        className="w-full mt-6 py-3 rounded-lg bg-black text-white"
      >
           {loadingPlan === plan.id ? "Processing..." : "Choose Plan"}
      </button>}
    </div>
    ))}
</div>
    )
}

export default Pricing;