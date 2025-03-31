import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaypalPayment from "./components/payment/PaypalPayment";
import CancelPayment from "./pages/payment/CancelPayment";
import CompletePayment from "./pages/payment/CompletePayment";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaypalPayment />} />
        <Route path="/complete-payment" element={<CompletePayment />} />
        <Route path="/cancel-payment" element={<CancelPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
