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
