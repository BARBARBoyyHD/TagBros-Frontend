import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config/BaseURL";
import SubsCard from "./SubsCard"; // ✅ Import SubsCard

export default function SubsData() {
  const [plans, setPlans] = useState([]); // ✅ Store subscription plans

  const getSubsPlan = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/paypal/product/list`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // ✅ Ensures cookies are included if needed
      });

      console.log("✅ Subscription Plans:", res.data);
      setPlans(res.data.plans); // ✅ Store plans in state
    } catch (error) {
      console.error("❌ Failed to fetch subscription plans:", error.message);
    }
  };

  useEffect(() => {
    getSubsPlan(); // ✅ Fetch plans when component mounts
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Subscription Plans</h1>
      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <SubsCard key={plan.id} plan={plan} /> // ✅ Pass plan as prop
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading plans...</p>
      )}
    </div>
  );
}
