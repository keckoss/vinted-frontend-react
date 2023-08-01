import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Header from "./assets/components/Header";
import Hero from "./assets/components/Hero";
import Offres from "./assets/components/Offres";
import Signup from "./assets/components/Signup";
import Login from "./assets/pages/Login";
import Publish from "./assets/pages/Publish";
import CheckoutForm from "./assets/components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/offers" element={<Offres />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
