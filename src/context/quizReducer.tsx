export const initialState = {
  questionCount: 0,
  adQuestionCount: 0,
  score: 0,
  quizPhase: "QUIZ", // Initial phase of the quiz
  quizCategory: "IPL",
  quizSubCategory: ""
};

export type TriviaState = {
  questionCount: number;
  adQuestionCount: number;
  score: number;
  quizPhase: string;
  quizCategory: string;
  quizSubCategory: string;
};

export type TriviaAction = { type: string };

export const quizReducer = (state: TriviaState, action: TriviaAction) => {
  switch (action.type) {
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };
    case "INCREMENT_QUESTION":
      return { ...state, questionCount: state.questionCount + 1 };
    case "INCREMENT_AD_QUESTION":
      return { ...state, adQuestionCount: state.adQuestionCount + 1 };
    case "START_AD":
      return { ...state, quizPhase: "AD" };
    case "START_AD_QUIZ":
      return { ...state, quizPhase: "ADQUIZ" };
    case "START_LEADERBOARD":
      return { ...state, quizPhase: "LEADERBOARD" };
    case "RESET_QUIZ":
      return initialState;

    case "TEAM_CSK":
      return { ...state, quizSubCategory: "CSK" };
    case "TEAM_MI":
      return { ...state, quizSubCategory: "MI" };
    case "TEAM_RCB":
      return { ...state, quizSubCategory: "RCB" };
    default:
      return state;
  }
};
