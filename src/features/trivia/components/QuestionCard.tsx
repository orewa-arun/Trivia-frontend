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
    console.log("Question type: ", question_type)

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
    let baseClasses = "p-3 mb-2 rounded-lg transition-colors";

    if (timeLeft > 0 && !isSubmitting && !hasSubmittedRef.current) {
      baseClasses += " cursor-pointer";
      if (selectedIndex === index) {
        baseClasses += " bg-blue-600 text-white";
      } else {
        baseClasses += " bg-white hover:bg-blue-100";
      }
    } else {
      baseClasses += " bg-gray-100 cursor-default";
    }

    return baseClasses;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question}</h2>

      <ul className="space-y-3 mb-6">
        {options.map((option, index) => (
          <li
            key={index}
            className={getOptionClasses(index)}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>

      <div className="bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Time left: {timeLeft}s</span>
        {isSubmitting && <span>Submitting...</span>}
      </div>
    </div>
  );
};

export default QuestionCard;
