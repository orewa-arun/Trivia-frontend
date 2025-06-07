import { useState, useEffect, useRef } from "react";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import { submitAnswer as submitAnswerApi } from "../api/triviaApi";

interface QuestionCardProps {
  question: string;
  options: string[];
  question_type: string;
  questionId: number;
  timePerQuestion: number;
  onNextQuestion: () => Promise<void>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  questionId,
  timePerQuestion,
  onNextQuestion,
  question_type,
  setScore,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [timeLeft, setTimeLeft] = useState<number>(timePerQuestion);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { session } = useTriviaSession();

  const selectedIndexRef = useRef<number>(-1);
  const hasSubmittedRef = useRef<boolean>(false);

  // Timer effect
  useEffect(() => {
    setTimeLeft(timePerQuestion);
    setSelectedIndex(-1);
    selectedIndexRef.current = -1;
    hasSubmittedRef.current = false;
    setIsSubmitting(false);
    console.log("Question type: ", question_type);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question, timePerQuestion]);

  const handleOptionClick = (index: number) => {
    if (timeLeft <= 0 || isSubmitting || hasSubmittedRef.current) return;
    setSelectedIndex(index);
    selectedIndexRef.current = index;
  };

  const submitAnswer = async () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    setIsSubmitting(true);
    try {
      if (session.sessionId != null) {
        const response = await submitAnswerApi(
          session.sessionId,
          questionId,
          selectedIndexRef.current
        );
        if (response.is_correct) {
          setScore((prevScore: number) => prevScore + 1);
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      onNextQuestion();
    }
  };

  const handleTimeUp = () => {
    submitAnswer();
  };

  const getOptionClasses = (index: number) => {
    let baseClasses =
      "p-4 mb-3 rounded-lg font-medium text-gray-700 shadow-sm transition-colors duration-300";

    if (timeLeft > 0 && !isSubmitting && !hasSubmittedRef.current) {
      baseClasses += " cursor-pointer border border-transparent";

      if (selectedIndex === index) {
        baseClasses += " bg-indigo-600 text-white shadow-md";
      } else {
        baseClasses += " bg-white hover:bg-indigo-50 hover:border-indigo-300";
      }
    } else {
      baseClasses += " bg-gray-100 cursor-not-allowed border border-gray-200";
      // Optionally highlight correct/incorrect after submit here
    }
    return baseClasses;
  };

  return (
    <div className="w-full bg-white rounded-xl p-6">
      {/* Header: Progress Bar + Meta Info */}
      <div className="space-y-2 mb-6">
        {/* Progress Bar */}
        <div className="w-full bg-indigo-100 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
          />
        </div>

        {/* Time left + Question number */}
        <div className="flex justify-between text-sm text-gray-600 font-medium select-none">
          <span>
            Time Left: <span className="font-semibold">{timeLeft}s</span>
          </span>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 leading-snug tracking-normal">
        {question}
      </h2>

      {/* Options */}
      <ul className="space-y-4">
        {options.map((option, index) => (
          <li
            key={index}
            className={getOptionClasses(index)}
            onClick={() => handleOptionClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleOptionClick(index);
            }}
            aria-pressed={selectedIndex === index}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Submitting status below */}
      {isSubmitting && (
        <div className="mt-6 text-center text-indigo-600 italic font-medium text-sm">
          Submitting your answer...
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
