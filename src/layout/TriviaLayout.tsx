import React from "react";
import { Trophy } from "lucide-react";

const TriviaLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="w-full shadow bg-white py-4 px-6 flex items-center justify-center sticky top-0 z-10 border-b">
        <div className="flex items-center gap-2 font-bold text-xl text-black">
          <Trophy className="w-6 h-6" />
          <span>The Great Indian Trivia</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-600 py-4 border-t">
        © {new Date().getFullYear()} The Great Indian Trivia. All rights reserved.
      </footer>
    </div>
  );
};

export default TriviaLayout;