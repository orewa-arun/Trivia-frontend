import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startSession } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import LoadingScreen from "../../../components/LoadingScreen";
import "./NameInput.css"; // Make sure this exists and includes styles below

const NameInput = () => {
  const [name, setName] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { startNewSession } = useTriviaSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submitted) return;
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, submitted]);

  const startAndSaveSession = async () => {
    try {
      const response = await startSession("guest", name || "Guest User");
      startNewSession(response.session_id, name || "Guest User");
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (submitted) return;
      await startAndSaveSession();
      setSubmitted(true);
      navigate("/trivia/quiz");
    } catch (error) {
      console.error("Error during submission:", error);
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Preparing your Quiz..." />;
  }

  return (
    <div className="name-input-bg relative min-h-screen flex items-center justify-center p-4">
      {/* Star Overlay */}
      <div className="absolute inset-0 glitter-overlay pointer-events-none">
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
      </div>

      <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center z-10">
        <h2 className="text-3xl font-bold text-black mb-4">
          Welcome to the Quiz!
        </h2>

        <p className="text-gray-700 text-base mb-6">
          Please enter your name to begin. You’ll be auto-joined in{" "}
          <span className="font-semibold text-black">{secondsLeft}s</span>.
        </p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-3 border border-orange-300 rounded-xl text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
        />

        <button
          onClick={handleSubmit}
          disabled={submitted}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default NameInput;
