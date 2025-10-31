import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation, { NAVBAR_HEIGHT } from "./components/layout/Navigation.jsx";
import Footer from "./components/layout/Footer.jsx";
import HomePageSkeleton from "./components/HomePageSkeleton.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));

export default function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navigation />
      <main
        style={{
          flex: 1,
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "1rem",
          paddingTop: NAVBAR_HEIGHT + 76,
          paddingBottom: 56,
        }}
      >
        <Suspense fallback={<HomePageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
