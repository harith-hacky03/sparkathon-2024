import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Deals from "./components/Deals";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import { PeerProvider } from "./components/PeerContext";

function App() {
  return (
    <PeerProvider>
      <div className="bg-[#e6f1fc]">
        <Router>
          {/* Navbar */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Hero */}
                  <Hero />
                  {/* Deals */}
                  <Deals />
                </>
              }
            />
            <Route path="/product" element={<ProductPage />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </Router>
      </div>
    </PeerProvider>
  );
}

export default App;
