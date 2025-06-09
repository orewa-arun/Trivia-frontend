import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen";
import { Trophy } from "lucide-react";
import { useTriviaSession } from "../../../context/TriviaSessionContext";

const logos = {
  TEAM_CSK:
    "https://static.wixstatic.com/media/0293d4_0be320985f284973a119aaada3d6933f~mv2.jpg/v1/fill/w_980,h_680,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0293d4_0be320985f284973a119aaada3d6933f~mv2.jpg",
  TEAM_RCB:
    "https://www.royalchallengers.com/PRRCB01/public/styles/1061x767_landscape/public/2025-02/RCB-LOGO-IMAGE-%281%29%20%281%29.jpg?itok=ZrMSeTQ9",
  TEAM_MI:
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/800px-Mumbai_Indians_Logo.svg.png",
};

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useTriviaSession();

  const handleStart = () => {
    if (!selectedTeam) {
      alert("Please select a team first!");
      return;
    }
    dispatch({ type: selectedTeam });
    setLoading(true);
    // You can pass selectedTeam via context or route state if needed here
    setTimeout(() => {
      navigate("/trivia/name"); // route for NameInput component
    }, 2000); // simulate loading
  };

  if (loading) {
    return <LoadingScreen message="Getting you started..." />;
  }

  return (
    <div className="name-input-bg flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
      <div className="max-w-md w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          <Trophy className="w-40 h-40 mx-auto" />
          THE GREAT IPL TRIVIA CHALLENGE!
        </h1>
        <p className="text-xl md:text-2xl text-yellow-100 mb-10 font-semibold drop-shadow-md">
          Are you ready to prove you're the biggest IPL fan? Step up, choose
          your franchise, and dominate the quiz battlefield! 🏏💥
        </p>

        <div className="flex justify-center gap-6 mb-10">
          {Object.entries(logos).map(([teamKey, logo]) => {
            const isSelected = selectedTeam === teamKey;
            return (
              <button
                key={teamKey}
                type="button"
                onClick={() => setSelectedTeam(teamKey)}
                className={`
                  flex flex-col items-center cursor-pointer rounded-xl py-3 px-5 w-28 shadow-lg transition 
                  ${
                    isSelected
                      ? "bg-orange-400 bg-opacity-90 shadow-yellow-500 scale-105"
                      : "bg-white bg-opacity-20 hover:bg-opacity-40"
                  }
                  focus:outline-none
                `}
                aria-pressed={isSelected}
                aria-label={`Select ${teamKey.replace("TEAM_", "")}`}
                value={teamKey}
              >
                <img
                  src={logo}
                  alt={`${teamKey.replace("TEAM_", "")} logo`}
                  className="w-16 h-16 mb-2 object-contain"
                  loading="lazy"
                />
                <span className={`font-bold text-lg`}>
                  {teamKey.replace("TEAM_", "")}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleStart}
          className="bg-orange-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-3xl transition-all shadow-lg text-lg disabled:opacity-50"
          disabled={!selectedTeam}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
