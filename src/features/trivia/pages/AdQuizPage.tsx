import { useState, useEffect } from "react";
import { completeSession, getNextAdQuestion } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import QuestionCard from "../components/QuestionCard";

interface AdQuestion {
  id: number;
  question: string;
  options: string[];
  question_type: string;
  category: string;
}

const AdQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<AdQuestion | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { session, endCurrentSession, setQuizPhase } = useTriviaSession();
  const [questionCount, setQuestionCount] = useState(0);
  const questionLimit = 2; // Limit for the number of questions
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
      const endSession = async () => {
        try {
          const response = await completeSession(session.sessionId!);
          console.log("Session completed:", response);
        } catch (error) {
          console.error("Error completing session:", error);
        }
      };

      endSession();
      endCurrentSession();
      setQuizPhase("LEADERBOARD");
    }
  }, [quizCompleted]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await getNextAdQuestion(session.sessionId!);

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
    <div>
      <div>Question No : {questionCount + 1}</div>
      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        questionId={currentQuestion.id}
        question_type={currentQuestion.question_type}
        timePerQuestion={timePerQuestion}
        onNextQuestion={handleNextQuestion}
        setScore={setScore}
      />
      <div>Your score: {score}</div>
    </div>
  );
};

export default AdQuizPage;
