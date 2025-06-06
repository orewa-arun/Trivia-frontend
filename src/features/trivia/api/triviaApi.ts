import axios from "axios";
import type { Question } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const startSession = async (uid: string, name: string) => {
  return axios
    .post(`${API_BASE_URL}/trivia/start`, { uid: uid, guest_user_name: name })
    .then((response) => {
      console.log("Session started :", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getNextQuestion = async (sessionId: number): Promise<Question> => {
  return axios
    .post(`${API_BASE_URL}/trivia/next?session_id=${sessionId}`)
    .then((response) => {
      console.log("Next Question Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const submitAnswer = async (
  sessionId: number,
  questionId: number,
  selectedIndex: number
) => {
  return axios
    .post(`${API_BASE_URL}/trivia/answer`, {
      session_id: sessionId,
      question_id: questionId,
      selected_index: selectedIndex,
    })
    .then((response) => {
      console.log("Submit Answer Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getAd = async (adId: number) => {
  return axios
    .post(`${API_BASE_URL}/trivia/ad?ad_id=${adId}`)
    .then((response) => {
      console.log("Ad Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching ad:", error);
    });
};

export const getNextAdQuestion = async (sessionId: number) => {
  return axios
    .post(`${API_BASE_URL}/trivia/next/ad?session_id=${sessionId}`)
    .then((response) => {
      console.log("Next Ad Question Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const completeSession = async (sessionId: number) => {
  return axios
    .post(`${API_BASE_URL}/trivia/complete?session_id=${sessionId}`)
    .then((response) => {
      console.log("Session completed:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error completing session:", error);
    });
}

export const getLeaderboard = async () => {
  return axios
    .post(`${API_BASE_URL}/trivia/leaderboard`)
    .then((response) => {
      console.log("Leaderboard Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching leaderboard:", error);
    });
}
