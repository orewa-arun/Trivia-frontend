import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NameInput = () => {
  const [name, setName] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Countdown timer
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

  const handleSubmit = () => {
    if (!name.trim()) {
      setName("Guest"); // default name
    }
    setSubmitted(true);
    // Optionally store the name in context or local storage
    localStorage.setItem("trivia_username", name || "Guest");
    navigate("/trivia/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 text-center">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Enter your name
        </h2>
        <p className="text-gray-600 mb-6">You have {secondsLeft} seconds</p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NameInput;