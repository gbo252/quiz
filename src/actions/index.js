import trivia from "../apis/trivia";
import { FETCH_QUESTIONS, COUNTER } from "./types";

export const fetchQuestions = () => async (dispatch, getState) => {
    const response = await trivia.get(`?amount=${getState().quizLength}&category=9&difficulty=easy&type=multiple`);

    dispatch({ type: FETCH_QUESTIONS, payload: response.data.results });
};

export const nextQuestion = () => {
    return {
        type: COUNTER
    }
};