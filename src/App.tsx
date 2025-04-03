import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import { client_id } from "./config/Credentials";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalPayment from "./components/payment/PaypalPayment";
import CancelPayment from "./pages/payment/CancelPayment";
import CompletePayment from "./pages/payment/CompletePayment";
import PlanPages from "./pages/subscription/PlanPages";
import PaymentReturn from "./pages/payment/PaymentReturn";
import HomePages from "./pages/user/HomePages";
import UserLogin from "./pages/user/UserLogin";
import IgGeneratorPages from "./pages/instagram/IgGeneratorPages";
import ProtectedRoute from "./utils/Protected";
import SignUpPage from "./pages/user/SignUpPages";

function App() {
  const paypalOptions = {
    clientId: client_id, // ✅ Correct key format
    intent: "subscription",
    currency: "USD",
    vault: true, // Required for subscriptions
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/complete-payment" element={<CompletePayment />} />
          <Route path="/cancel-payment" element={<CancelPayment />} />
          <Route path="/subscription/plan" element={<PlanPages />} />
          <Route path="/return/:subscriptionId" element={<PaymentReturn />} />
          <Route path="/pages/login" element={<UserLogin />} />
          <Route path="/pages/signup" element={<SignUpPage />}  />
          <Route element={<ProtectedRoute />}>
            <Route path="/pages/ig/generator" element={<IgGeneratorPages />} />
          </Route>
        </Routes>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
