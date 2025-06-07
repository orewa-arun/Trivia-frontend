import React from "react";
import LandingPage from "./features/trivia/components/LandingPage";
import { Route, Routes } from "react-router-dom";
import NameInput from "./features/trivia/components/NameInput";
import TriviaFlow from "./features/trivia/pages/TriviaFlow";
import TriviaLayout from "./layout/TriviaLayout";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<TriviaLayout><LandingPage /></TriviaLayout>} />
        <Route path="/trivia/name" element={<TriviaLayout><NameInput /></TriviaLayout>} />
        <Route path="/trivia/quiz" element={<TriviaLayout><TriviaFlow /></TriviaLayout>} />
      </Routes>
    </div>
  );
};

export default App;
