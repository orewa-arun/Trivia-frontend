import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuizPage from "./QuizPage";
import AdSection from "../components/AdSection";
import AdQuizPage from "./AdQuizPage";
import Leaderboard from "../components/Leaderboard";

// quizPhase should change to "QUIZ" when play_again is clicked and the navigated to the landing page route, reset the session user info
const TriviaFlow = () => {
  const { quizPhase } = useTriviaSession();

  return (
    <div>
      <div>{quizPhase == "QUIZ" && <QuizPage />}</div>
      <div>{quizPhase == "AD" && <AdSection />}</div>
      <div>{quizPhase == "ADQUIZ" && <AdQuizPage />}</div>
      <div>{quizPhase == "LEADERBOARD" && <Leaderboard />}</div>
    </div>
  );
};
export default TriviaFlow;
