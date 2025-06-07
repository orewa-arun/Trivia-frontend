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
    <div className="w-full p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
        {question}
      </h2>

      <ul className="space-y-4 mb-8">
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

      {/* Progress Bar */}
      <div className="w-full bg-indigo-100 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="bg-indigo-600 h-4 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
        />
      </div>

      <div className="flex justify-between mt-3 text-sm text-gray-600 font-medium select-none">
        <span>
          Time left: <span className="font-bold">{timeLeft}s</span>
        </span>
        {isSubmitting && (
          <span className="italic text-indigo-600">Submitting...</span>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
