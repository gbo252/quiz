import _ from "lodash";

import trivia from "../apis/trivia";
import {
    FETCH_QUESTIONS,
    FETCH_ANSWERS,
    COUNTER,
    RESET_COUNTER,
    SELECT_ANSWER,
    TOGGLE_LOCK,
    SCORE,
    RESET_SCORE
} from "./types";

export const resetQuiz = () => async (dispatch) => {
    await dispatch(fetchQuestions());

    dispatch(resetCounter());

    dispatch(resetScore());
};

export const fetchQuestions = () => async (dispatch, getState) => {
    const response = await trivia.get(`?amount=${getState().quizLength}&category=9&difficulty=easy&type=multiple`);

    const answersArray = response.data.results.map(x => _.shuffle([...x.incorrect_answers, x.correct_answer]));

    dispatch({ type: FETCH_QUESTIONS, payload: response.data.results });
    dispatch({ type: FETCH_ANSWERS, payload: answersArray });
};

export const nextQuestion = () => (dispatch, getState) => {
    if (getState().counter > -1) {
        dispatch(toggleLock());
    }

    dispatch({ type: COUNTER });
};

export const resetCounter = () => {
    return { type: RESET_COUNTER };
}

export const increaseScore = () => {
    return { type: SCORE };
};

export const resetScore = () => {
    return { type: RESET_SCORE };
};

export const selectAnswer = (answer, i) => {
    return { type: SELECT_ANSWER, payload: { answer, i } };
};

export const toggleLock = () => {
    return { type: TOGGLE_LOCK };
};