import {
    PayPalButtons,
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { client_id } from "../../config/Credentials";
import { BASE_URL } from "../../config/BaseURL";

export default function PaypalPayment() {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: "test", // ✅ Fix: Changed from "client-id" to clientId
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async (data: any, actions: any): Promise<string> => {
    try {
      const response = await fetch(`${BASE_URL}/api/payment/paypal/createorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result.orderID;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      window.location.href = "/cancel-payment";
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      console.log("PayPal Approval Data:", data);
      if (!data.orderID) throw new Error("Invalid order ID");
  
      const response = await fetch(
        `${BASE_URL}/api/payment/paypal/capturepayment/${data.orderID}`, // ✅ Fix: Use `data.orderID`
        {
          method: "POST", // ✅ Fix: Use `POST`
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

  
      const result = await response.json();
      console.log("Payment Captured:", result);
      window.location.href = "/complete-payment";
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      window.location.href = "/cancel-payment";
    }
  };
  const onError = (err: any) => {
    console.error("PayPal Checkout Error:", err);
    window.location.href = "/cancel-payment";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Pay with PayPal</h2>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            fundingSource="paypal"
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
