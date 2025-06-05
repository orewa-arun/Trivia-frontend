import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { TriviaSessionProvider } from '../src/context/TriviaSessionContext';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TriviaSessionProvider>
        <App />
      </TriviaSessionProvider> 
    </BrowserRouter>
  </StrictMode>
);