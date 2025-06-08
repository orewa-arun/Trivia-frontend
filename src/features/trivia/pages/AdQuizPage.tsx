import { useState, useEffect } from "react";
import { completeSession, getNextAdQuestion } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuestionCard from "../components/QuestionCard";
import LoadingScreen from "../../../components/LoadingScreen";
import ThreeDotLoader from "../../../components/ThreeDotLoader";
import "../components/NameInput.css"; // ⬅️ Use same visual styling

interface AdQuestion {
  id: number;
  question: string;
  options: string[];
  question_type: string;
  category: string;
}

const AdQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<AdQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { session, endCurrentSession, state, dispatch } = useTriviaSession();
  const questionLimit = 2;
  const timePerQuestion = 10;

  useEffect(() => {
    if (session.sessionId && !currentQuestion && state.quizPhase === "ADQUIZ") {
      fetchQuestion();
    }
  }, [session.sessionId, state.quizPhase]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await getNextAdQuestion(session.sessionId!);

      const currentQuestion = {
        id: response.id,
        question: response.question,
        options: response.options,
        question_type: response.question_type,
        category: response.category,
      };

      setCurrentQuestion(currentQuestion);
    } catch (error) {
      console.error("Error fetching ad question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    if (state.adQuestionCount + 1 >= questionLimit) {
      setIsLoading(true);
      try {
        await completeSession(session.sessionId!);
        endCurrentSession();
        dispatch({ type: "START_LEADERBOARD" });
      } catch (error) {
        console.error("Error completing session:", error);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    dispatch({ type: "INCREMENT_AD_QUESTION" });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await fetchQuestion();
  };

  if (isLoading) {
    return (
      <div className="name-input-bg relative min-h-screen flex items-center justify-center">
        <div className="glitter-overlay" />
        <ThreeDotLoader />
      </div>
    );
  }

  if (state.quizPhase !== "ADQUIZ") {
    return <LoadingScreen message="Getting your ads..." />;
  }

  if (!currentQuestion) {
    return <div>No ad questions available</div>;
  }

  return (
    <div className="name-input-bg relative min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glitter-overlay pointer-events-none z-0">
        <div className="star" style={{ top: "10%", left: "15%" }} />
        <div className="star" style={{ top: "30%", left: "75%" }} />
        <div className="star" style={{ top: "60%", left: "40%" }} />
        <div className="star" style={{ top: "80%", left: "80%" }} />
      </div>

      <div className="w-full max-w-5xl bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-black z-10">
        <div className="text-center text-gray-700 font-medium mb-4">
          Ad Question {state.adQuestionCount + 1} of {questionLimit}
        </div>

        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          questionId={currentQuestion.id}
          question_type={currentQuestion.question_type}
          timePerQuestion={timePerQuestion}
          onNextQuestion={handleNextQuestion}
        />

        <div className="mt-6 bg-indigo-100 text-indigo-800 font-semibold rounded-md py-3 px-5 text-center text-lg shadow-inner select-none">
          Your Score: {state.score}
        </div>
      </div>
    </div>
  );
};

export default AdQuizPage;