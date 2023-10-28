//This file is the window to the world.  
//Link to Browser to render.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// require('dotenv').config();
import App from "./app/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
