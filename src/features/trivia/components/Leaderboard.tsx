import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/triviaApi";

type LeaderboardEntry = {
  user_id: number;
  name: string;
  score: number;
  started_at: string;
  completed_at: string;
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      }
    };
    loadLeaderboard();
  }, []);

  // Mock user avatars - replace with actual user avatars
  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2", 
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
    "https://i.pravatar.cc/100?img=5",
    "https://i.pravatar.cc/100?img=6",
    "https://i.pravatar.cc/100?img=7",
    "https://i.pravatar.cc/100?img=8"
  ];

  // const getPositionStyle = (index: number) => {
  //   if (index === 0) return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg";
  //   if (index === 1) return "bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-md";
  //   if (index === 2) return "bg-gradient-to-r from-orange-300 to-orange-400 text-white shadow-md";
  //   return "bg-white text-gray-700 shadow-sm";
  // };

  // const getPositionIcon = (index: number) => {
  //   if (index === 0) return "🥇";
  //   if (index === 1) return "🥈"; 
  //   if (index === 2) return "🥉";
  //   return `${index + 1}`;
  // };

  const currentUserIndex = 49; // Assuming current user is at position 50 like in the image

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden">
      {/* Glitter overlay */}
      <div className="glitter-overlay">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-6 h-6">
            <svg fill="white" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>
          <h1 className="text-white text-xl font-semibold">Leaderboard</h1>
          <div className="w-6 h-6"></div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white bg-opacity-20 rounded-full p-1 mb-8">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'daily' 
                ? 'bg-white text-orange-500 shadow-md' 
                : 'text-white text-opacity-80'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'monthly' 
                ? 'bg-white text-orange-500 shadow-md' 
                : 'text-white text-opacity-80'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Top 3 podium */}
        {leaderboard.length >= 3 && (
          <div className="flex items-end justify-center space-x-4 mb-8">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <img
                  src={avatars[1] || "https://i.pravatar.cc/100?img=2"}
                  alt={leaderboard[1]?.name || "User"}
                  className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-white font-medium text-sm text-center mb-1 max-w-20 truncate">
                {leaderboard[1]?.name || "User"}
              </h3>
              <p className="text-white text-opacity-80 text-xs">
                {leaderboard[1]?.score || 0} pts
              </p>
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <img
                  src={avatars[0] || "https://i.pravatar.cc/100?img=1"}
                  alt={leaderboard[0]?.name || "User"}
                  className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-xl"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-white font-semibold text-base text-center mb-1 max-w-24 truncate">
                {leaderboard[0]?.name || "User"}
              </h3>
              <p className="text-white text-opacity-90 text-sm font-medium">
                {leaderboard[0]?.score || 0} pts
              </p>
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <img
                  src={avatars[2] || "https://i.pravatar.cc/100?img=3"}
                  alt={leaderboard[2]?.name || "User"}
                  className="w-16 h-16 rounded-full border-4 border-orange-300 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-white font-medium text-sm text-center mb-1 max-w-20 truncate">
                {leaderboard[2]?.name || "User"}
              </h3>
              <p className="text-white text-opacity-80 text-xs">
                {leaderboard[2]?.score || 0} pts
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard list */}
      <div className="bg-white rounded-t-3xl flex-1 min-h-96 relative z-10 px-6 pt-6">
        <div className="space-y-3">
          {leaderboard.slice(3).map((entry, index) => {
            const actualIndex = index + 3;
            const isCurrentUser = actualIndex === currentUserIndex;
            
            return (
              <div
                key={entry.user_id}
                className={`flex items-center p-4 rounded-2xl transition-all ${
                  isCurrentUser 
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg transform scale-102' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${
                  isCurrentUser ? 'bg-white bg-opacity-20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {actualIndex + 1}
                </div>
                
                <img
                  src={avatars[actualIndex % avatars.length] || `https://i.pravatar.cc/100?img=${actualIndex + 1}`}
                  alt={entry.name || "User"}
                  className="w-12 h-12 rounded-full mr-4 shadow-sm"
                />
                
                <div className="flex-1">
                  <h3 className={`font-medium ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                    {entry.name || "Anonymous"}
                  </h3>
                  <p className={`text-sm font-semibold ${isCurrentUser ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                    {entry.score} pts
                  </p>
                </div>

                {isCurrentUser && (
                  <div className="ml-2">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
          
          {leaderboard.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-lg font-medium">No leaderboard data available yet.</p>
              <p className="text-sm">Start playing to see your ranking!</p>
            </div>
          )}
        </div>
        
        {/* Bottom padding for better scrolling */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default Leaderboard;