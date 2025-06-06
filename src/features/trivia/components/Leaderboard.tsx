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

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🏆 Trivia Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-100 text-blue-800 text-sm uppercase tracking-wider">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No leaderboard data available yet.
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => (
                <tr
                  key={entry.user_id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2">{entry.name || "Anonymous"}</td>
                  <td className="px-4 py-2 font-semibold text-green-600">
                    {entry.score}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(entry.completed_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;