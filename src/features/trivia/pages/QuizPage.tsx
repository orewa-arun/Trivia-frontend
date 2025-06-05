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
  const { session, endCurrentSession } = useTriviaSession();
  const [questionCount, setQuestionCount] = useState(0);
  const questionLimit = 10; // Limit for the number of questions
  const timePerQuestion = 10; // Default time per question

  // Fetch initial question
  useEffect(() => {
    if (session.sessionId && !currentQuestion && !quizCompleted) {
      fetchQuestion();
    }
  }, [session.sessionId]);

  useEffect(() => {
    if (quizCompleted) {
      // currently, we assume that the session should end when the quiz is completed
      // later, we have to go to ad section from here
      endCurrentSession();
    }
  }, [quizCompleted]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await getNextQuestion(session.sessionId!);

      console.log(response)

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
    <QuestionCard
      question={currentQuestion.question}
      options={currentQuestion.options}
      questionId={currentQuestion.id}
      question_type={currentQuestion.question_type}
      timePerQuestion={timePerQuestion}
      onNextQuestion={handleNextQuestion}
    />
  );
};

export default QuizPage;
