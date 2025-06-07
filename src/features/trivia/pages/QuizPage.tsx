import { useState, useEffect } from "react";
import { getNextQuestion } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuestionCard from "../components/QuestionCard";

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
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { session, setQuizPhase } = useTriviaSession();
  const [questionCount, setQuestionCount] = useState(0);
  const questionLimit = 10; // Limit for the number of questions
  const timePerQuestion = 10; // Default time per question
  const [score, setScore] = useState(0);

  // Fetch initial question
  useEffect(() => {
    if (session.sessionId && !currentQuestion && !quizCompleted) {
      fetchQuestion();
    }
  }, [session.sessionId]);

  useEffect(() => {
    if (quizCompleted) {
      setQuizPhase("AD");
    }
  }, [quizCompleted]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await getNextQuestion(session.sessionId!);

      console.log(response);

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
    const nextCount = questionCount + 1;

    if (nextCount >= questionLimit) {
      setQuizCompleted(true);
      return;
    }

    setQuestionCount(nextCount);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await fetchQuestion();
  };

  if (isLoading) {
    return <div>Loading question...</div>;
  }

  if (quizCompleted) {
    return <div>Quiz completed! Thank you for playing.</div>;
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 flex flex-col">
        {/* Progress bar at top */}
        {/* <div className="mb-4">
          <div className="w-full bg-indigo-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(questionCount / questionLimit) * 100}%` }}
            />
          </div>
        </div> */}

        {/* Question count (simple style) */}
        <div className="my-3 text-center text-gray-600 font-medium">
          Question {questionCount + 1} of {questionLimit}
        </div>

        <div className="flex-1">
          {isLoading ? (
            <div className="text-center py-10 text-indigo-600 font-semibold text-base">
              Loading question...
            </div>
          ) : quizCompleted ? (
            <div className="text-center py-10 text-green-700 font-semibold text-lg">
              🎉 Quiz completed! Thank you for playing.
            </div>
          ) : !currentQuestion ? (
            <div className="text-center py-10 text-red-500 font-semibold text-base">
              No questions available
            </div>
          ) : (
            <>
              <div className="w-full">
                <QuestionCard
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  questionId={currentQuestion.id}
                  question_type={currentQuestion.question_type}
                  timePerQuestion={timePerQuestion}
                  onNextQuestion={handleNextQuestion}
                  setScore={setScore}
                />
              </div>

              {/* Score below question card, more visible */}
              <div className="mt-4 bg-indigo-100 text-indigo-800 font-semibold rounded-md py-3 px-5 text-center text-lg shadow-inner select-none">
                Your Score: {score}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
