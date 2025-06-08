import { useState, useEffect, useRef } from "react";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import { submitAnswer as submitAnswerApi } from "../api/triviaApi";
import "./NameInput.css";

interface QuestionCardProps {
  question: string;
  options: string[];
  question_type: string;
  questionId: number;
  timePerQuestion: number;
  onNextQuestion: () => Promise<void>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  question_type,
  questionId,
  timePerQuestion,
  onNextQuestion,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [, setCorrectIndex] = useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(timePerQuestion);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [blinkType, setBlinkType] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const { session, dispatch } = useTriviaSession();

  const selectedIndexRef = useRef<number>(-1);
  const hasSubmittedRef = useRef<boolean>(false);

  useEffect(() => {
    setTimeLeft(timePerQuestion);
    setSelectedIndex(-1);
    setCorrectIndex(null);
    selectedIndexRef.current = -1;
    hasSubmittedRef.current = false;
    setIsSubmitting(false);
    setBlinkType(null);
    setIsAnswerCorrect(null);

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
    console.log("question_type :", question_type);

    try {
      if (session.sessionId != null) {
        const response = await submitAnswerApi(
          session.sessionId,
          questionId,
          selectedIndexRef.current
        );

        setCorrectIndex(response.correct_index);
        setIsAnswerCorrect(response.is_correct);

        if (response.is_correct) {
          dispatch({ type: "INCREMENT_SCORE" });
          setBlinkType("correct");
        } else {
          setBlinkType("incorrect");
        }

        // Go to next question after 2s
        setTimeout(() => {
          setBlinkType(null);
          onNextQuestion();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      onNextQuestion(); // fallback
    }
  };

  const handleTimeUp = () => {
    submitAnswer();
  };

  const getOptionClasses = (index: number) => {
    let baseClasses =
      "p-4 mb-3 rounded-lg font-medium shadow-sm transition-all duration-300";

    if (hasSubmittedRef.current) {
      // if (correctIndex === index) {
      if (isAnswerCorrect && selectedIndex === index) {
        baseClasses += " bg-green-500 text-white";
        // Apply green blink to correct answer if it was selected
        if (blinkType === "correct") {
          baseClasses += " animate-blink-green";
        }
      } else if (selectedIndex === index) {
        baseClasses += " bg-red-500 text-white";
        // Apply red blink to incorrect selected answer
        if (blinkType === "incorrect") {
          baseClasses += " animate-blink-red";
        }
      } else {
        baseClasses += " bg-gray-100 text-gray-500";
      }
    } else {
      baseClasses += " border border-transparent text-gray-700 cursor-pointer";

      if (selectedIndex === index) {
        baseClasses += " bg-orange-600 text-white";
      } else {
        baseClasses += " bg-white hover:bg-orange-50 hover:border-orange-300";
      }
    }

    return baseClasses;
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / timePerQuestion) * 100;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="w-full bg-white rounded-xl p-6 relative z-10">
      {/* Circular Timer */}
      <div className="flex justify-center mb-6">
        <svg className="w-20 h-20">
          <circle
            className="text-orange-200"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
          />
          <circle
            className="text-orange-500"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="text-sm fill-orange-700 font-bold"
          >
            {timeLeft}s
          </text>
        </svg>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 leading-snug tracking-normal text-center">
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

      {isSubmitting && isAnswerCorrect !== null && (
        <div
          className={`mt-6 text-center font-medium text-sm ${
            isAnswerCorrect ? "text-green-600 italic" : "text-red-600 italic"
          }`}
        >
          {isAnswerCorrect ? "Correct! 🎉" : "Oops! That's wrong"}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
