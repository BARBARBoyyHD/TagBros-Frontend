// Create a new component for handling the return URL
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/BaseURL";
import axios from "axios";

export default function PaymentReturn() {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateSubscription = async () => {
      try {
        await axios.post(`${BASE_URL}/api/activate-subscription`, {
          subscription_id: subscriptionId
        });
        navigate("/success");
      } catch (error) {
        navigate("/error");
      }
    };

    if (subscriptionId) {
      activateSubscription();
    }
  }, [subscriptionId, navigate]);

  return <div>Processing subscription approval...</div>;
}