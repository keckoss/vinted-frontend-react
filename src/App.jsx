import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Header from "./assets/components/Header";
import Hero from "./assets/components/Hero";
import Offres from "./assets/components/Offres";
import Signup from "./assets/components/Signup";
import Login from "./assets/pages/Login";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/offers" element={<Offres />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
