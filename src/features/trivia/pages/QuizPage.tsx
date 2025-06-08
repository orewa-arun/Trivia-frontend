import { useState, useEffect } from "react";
import { getNextQuestion } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuestionCard from "../components/QuestionCard";
import LoadingScreen from "../../../components/LoadingScreen";
import ThreeDotLoader from "../../../components/ThreeDotLoader";

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

  // Fetch initial question
  useEffect(() => {
    if (session.sessionId && !currentQuestion && state.quizPhase === "QUIZ") {
      fetchQuestion();
    }
  }, [session.sessionId, state.quizPhase]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await getNextQuestion(session.sessionId!);

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
      dispatch({ type: "START_AD" }); // Transition to "AD" phase
      return;
    }

    dispatch({ type: "INCREMENT_QUESTION" });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await fetchQuestion();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
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
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl p-8 flex flex-col">
        <div className="my-3 text-center text-gray-600 font-medium">
          Question {state.questionCount + 1} of {questionLimit}
        </div>

        <div className="flex-1">
          <div className="w-full">
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              questionId={currentQuestion.id}
              question_type={currentQuestion.question_type}
              timePerQuestion={timePerQuestion}
              onNextQuestion={handleNextQuestion}
            />
          </div>

          <div className="mt-4 bg-indigo-100 text-indigo-800 font-semibold rounded-md py-3 px-5 text-center text-lg shadow-inner select-none">
            Your Score: {state.score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
