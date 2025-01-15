import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import LjmList from "./components/ListFlow/index.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <LjmList request={() => Promise.resolve([])} renderItem={() => <div>test</div>} /> */}
  </StrictMode>
);
