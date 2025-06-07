import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuizPage from "./QuizPage";
import AdSection from "../components/AdSection";
import AdQuizPage from "./AdQuizPage";
import Leaderboard from "../components/Leaderboard";

// quizPhase should change to "QUIZ" when play_again is clicked and the navigated to the landing page route, reset the session user info
const TriviaFlow = () => {
  const { state } = useTriviaSession();

  return (
    <div>
      <div>{state.quizPhase == "QUIZ" && <QuizPage />}</div>
      <div>{state.quizPhase == "AD" && <AdSection />}</div>
      <div>{state.quizPhase == "ADQUIZ" && <AdQuizPage />}</div>
      <div>{state.quizPhase == "LEADERBOARD" && <Leaderboard />}</div>
    </div>
  );
};
export default TriviaFlow;
