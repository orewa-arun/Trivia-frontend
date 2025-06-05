import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface TriviaSession {
  sessionId: number | null;
  isSessionActive?: boolean;
  guestName?: string;
}

interface TriviaSessionContextType {
  session: TriviaSession;
  startNewSession: (sessionId: number, guestName: string) => void;
  endCurrentSession: () => void;
}

const TriviaSessionContext = createContext<
  TriviaSessionContextType | undefined
>(undefined);

export const TriviaSessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Load initial state from localStorage (if exists)
  const loadFromLocalStorage = (): TriviaSession => {
    const saved = localStorage.getItem("triviaSession");
    return saved
      ? JSON.parse(saved)
      : {
          sessionId: null,
          isSessionActive: false,
          guestName: "Guest User",
        };
  };

  const [session, setSession] = useState<TriviaSession>(loadFromLocalStorage());

  // Update localStorage whenever session changes
  useEffect(() => {
    localStorage.setItem("triviaSession", JSON.stringify(session));
  }, [session]);

  const startNewSession = (sessionId: number, guestName: string) => {
    const newSession = {
      ...session,
      sessionId,
      guestName,
      isSessionActive: true,
    };
    setSession(newSession);
  };

  const endCurrentSession = () => {
    setSession((prev) => ({
      ...prev,
      sessionId: null,
      guestName: "Guest User",
      isSessionActive: false,
    }));
  };

  return (
    <TriviaSessionContext.Provider
      value={{
        session,
        startNewSession,
        endCurrentSession,
      }}
    >
      {children}
    </TriviaSessionContext.Provider>
  );
};

export const useTriviaSession = () => {
  const context = useContext(TriviaSessionContext);
  if (context === undefined) {
    throw new Error(
      "useTriviaSession must be used within a TriviaSessionProvider"
    );
  }
  return context;
};