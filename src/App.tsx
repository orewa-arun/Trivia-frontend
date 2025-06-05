import React from "react";
import LandingPage from "./features/trivia/components/LandingPage";
import { Route, Routes } from "react-router-dom";
import NameInput from "./features/trivia/components/NameInput";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/trivia/name" element={<NameInput />} />
      </Routes>
    </div>
  );
};

export default App;
