import { useState, useEffect } from "react";
import { getNextQuestion } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuestionCard from "../components/QuestionCard";
import LoadingScreen from "../../../components/LoadingScreen";
import ThreeDotLoader from "../../../components/ThreeDotLoader";
import "../components/NameInput.css"; // ✅ Import same CSS file

interface Question {
  id: number;
  question: string;
  options: string[];
  question_type: string;
  category: string;
}

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session, state, dispatch } = useTriviaSession();
  const questionLimit = 10;
  const timePerQuestion = 10;

  useEffect(() => {
    if (session.sessionId && !currentQuestion && state.quizPhase === "QUIZ") {
      fetchQuestion();
    }
  }, [session.sessionId, state.quizPhase]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await getNextQuestion(session.sessionId!, state.quizCategory, state.quizSubCategory);

      const currentQuestion = {
        id: response.id,
        question: response.question,
        options: response.options,
        question_type: response.question_type,
        category: response.category,
      };

      setCurrentQuestion(currentQuestion);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    if (state.questionCount + 1 >= questionLimit) {
      dispatch({ type: "START_AD" });
      return;
    }

    dispatch({ type: "INCREMENT_QUESTION" });
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

  if (state.quizPhase === "AD") {
    return <LoadingScreen message="Getting your ads..." />;
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
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
          Question {state.questionCount + 1} of {questionLimit}
        </div>

        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          questionId={currentQuestion.id}
          question_type={currentQuestion.question_type}
          timePerQuestion={timePerQuestion}
          onNextQuestion={handleNextQuestion}
        />

        <div className="mt-6 bg-orange-100 text-orange-800 font-semibold rounded-md py-3 px-5 text-center text-lg shadow-inner select-none">
          Your Score: {state.score}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
