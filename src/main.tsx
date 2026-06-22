import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import AttendancePage from "./pages/AttendancePage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  </React.StrictMode>
);
