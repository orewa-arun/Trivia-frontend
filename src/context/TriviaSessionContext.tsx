import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import type { Dispatch, ReactNode } from "react";
import {
  initialState,
  quizReducer,
  type TriviaAction,
  type TriviaState,
} from "./quizReducer";

interface TriviaSession {
  sessionId: number | null;
  isSessionActive?: boolean;
  guestName?: string;
}

interface TriviaSessionContextType {
  session: TriviaSession;
  startNewSession: (sessionId: number, guestName: string) => void;
  endCurrentSession: () => void;
  state: TriviaState;
  dispatch: Dispatch<TriviaAction>;
}

const TriviaSessionContext = createContext<
  TriviaSessionContextType | undefined
>(undefined);

const loadQuizStateFromStorage = (): TriviaState => {
  const saved = localStorage.getItem("quizState");
  if (!saved) return initialState;

  return JSON.parse(saved);
};

export const TriviaSessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(quizReducer, loadQuizStateFromStorage());

  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify(state)
    );
  }, [state.questionCount]);

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

  useEffect(() => {
    localStorage.setItem("triviaSession", JSON.stringify(session));
  }, [session]);

  const startNewSession = (sessionId: number, guestName: string) => {
    const newSession = {
      sessionId,
      guestName,
      isSessionActive: true,
    };
    localStorage.setItem("quizState", JSON.stringify(initialState));
    setSession(newSession);
  };

  const endCurrentSession = () => {
    setSession({
      sessionId: null,
      guestName: "Guest User",
      isSessionActive: false,
    });
    localStorage.setItem("quizState", JSON.stringify(initialState));
  };

  return (
    <TriviaSessionContext.Provider
      value={{
        session,
        startNewSession,
        endCurrentSession,
        state,
        dispatch,
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
