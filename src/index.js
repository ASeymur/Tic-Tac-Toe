import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Board from "./Board";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Board />
  </StrictMode>
);