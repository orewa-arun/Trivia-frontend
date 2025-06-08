import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/trivia/name"); // route for NameInput component
    }, 2000); // simulate loading
  };

  if (loading) {
    return <LoadingScreen message="Getting you started..." />;
  }

  return (
    <div className="name-input-bg flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          THE GREAT INDIAN TRIVIA
        </h1>
        <p className="text-lg text-white mb-8">
          Test your knowledge of Indian History and win glory!
        </p>

        {!loading && (
          <button
            onClick={handleStart}
            className="bg-orange-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all shadow-lg"
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
