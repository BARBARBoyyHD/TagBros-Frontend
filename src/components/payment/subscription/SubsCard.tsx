import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { BASE_URL } from "../../../config/BaseURL";
import axios from "axios";

export default function SubsCard({ plan }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!plan) return null;

  const createSubscription = async (data, actions) => {
    try {
      // Create the subscription through PayPal JS SDK
      return actions.subscription
        .create({
          plan_id: plan.id,
        })
        .then(async (subscriptionId) => {
          // Link with backend after successful creation
          await axios.post(`${BASE_URL}/api/subscriptions/plans/${plan.id}`, {
            user_email: "user@example.com",
            subscription_id: subscriptionId,
          });
          return subscriptionId;
        });
    } catch (error) {
      console.error("❌ Subscription creation failed:", error);
      throw error;
    }
  };

  const handleApprove = async (data, actions) => {
    try {
      setLoading(true);
      // Capture the subscription on your backend
      await axios.post(`${BASE_URL}/api/activate-subscription`, {
        subscription_id: data.subscriptionID,
      });
      alert("Subscription activated successfully!");
    } catch (error) {
      console.error("❌ Approval error:", error);
      setError("Error activating subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-72 text-center transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">
        {plan.description}
      </h2>
      <p className="text-gray-600 mt-2">
        {plan.billing_cycles?.[0]?.frequency?.interval_unit}
      </p>
      <p className="text-lg font-bold text-blue-600 mt-4">
        ${plan.billing_cycles?.[0]?.pricing_scheme?.fixed_price?.value || "N/A"}
      </p>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <PayPalButtons
        style={{ layout: "vertical" }}
        createSubscription={createSubscription} // Use createSubscription instead of createOrder
        onApprove={handleApprove}
        onError={(err) => {
          console.error("❌ PayPal Error:", err);
          setError("Payment processing failed");
        }}
      />

      {loading && <div className="text-blue-600 mt-4">Processing...</div>}
    </div>
  );
}
