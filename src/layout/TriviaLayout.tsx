import React from "react";
import { Trophy } from "lucide-react";

const TriviaLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800">
      {/* Header */}
      <header className="w-full shadow bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Trophy className="w-6 h-6" />
          <span>The Great Indian Trivia</span>
        </div>
        {/* Add optional nav or login status */}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} The Great Indian Trivia. All rights reserved.
      </footer>
    </div>
  );
};

export default TriviaLayout;