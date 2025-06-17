import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import App from "../App";

import PrivateRoute from "../components/PrivateRoute"; //
const ShoppingCart = lazy(() => import("../components/ShoppingCart")); //
const AboutUsPage = lazy(() => import("../pages/AboutUsPage"));
const ServicesPage = lazy(() => import("../pages/Service"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));
const FigmaButton = lazy(() => import("../pages/FigmaButton"));
const Checkout = lazy(() => import("../pages/Checkout")); // ✅ NEW

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Root loads your App (MedicalTestsPage inside it) */}
          <Route path="/" element={<App />} />
          {/* Lazy load about us */}
          <Route path="/aboutus" element={<AboutUsPage />} />
          {/* Lazy load services */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/figmaButton" element={<FigmaButton />} />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          {/* ✅ Add Shopping Cart with PrivateRoute */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            }
          />
          {/* Redirect /home to / */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          {/* Catch all unmatched paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
