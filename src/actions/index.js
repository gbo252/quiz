import _ from "lodash";

import trivia from "../apis/trivia";
import {
    SESSION_TOKEN,
    RESPONSE_CODE,
    FETCH_CATEGORIES,
    SELECT_CATEGORY,
    FETCH_QUESTIONS,
    FETCH_ANSWERS,
    INCREASE_COUNTER,
    RESET_COUNTER,
    SELECT_ANSWER,
    TOGGLE_LOCK,
    INCREASE_SCORE,
    RESET_SCORE,
    TOGGLE_LOADING,
    TOGGLE_ANIMATE
} from "./types";

export const resetQuiz = () => dispatch => {
    dispatch(selectCategory("X"));
    dispatch(resetCounter());
    dispatch(resetScore());
};

export const getSessionToken = () => async (dispatch) => {
    const sessionToken = await trivia.get("/api_token.php?command=request");
    
    dispatch({ type: SESSION_TOKEN, payload: sessionToken.data.token });
};

export const fetchCategories = () => async (dispatch) => {
    const response = await trivia.get("/api_category.php");

    if (response.status !== 200) {
        dispatch({ type: FETCH_CATEGORIES, payload: [{ error: true }] });
    } else {
        dispatch({ type: FETCH_CATEGORIES, payload: response.data.trivia_categories });
    }
};

export const selectCategory = category => {
    return { type: SELECT_CATEGORY, payload: category };
};

export const fetchQuestions = () => async (dispatch, getState) => {
    if (!getState().sessionToken) {
        await dispatch(getSessionToken());
    }

    const response = await trivia.get(`/api.php?amount=${getState().quizLength}&category=${getState().selectedCategory}&type=multiple&token=${getState().sessionToken}`);
    
    const answersArray = response.data.results.map(x => _.shuffle([...x.incorrect_answers, x.correct_answer]));

    dispatch({ type: FETCH_QUESTIONS, payload: response.data.results });
    dispatch({ type: FETCH_ANSWERS, payload: answersArray });
    await dispatch({ type: RESPONSE_CODE, payload: response.data.response_code });

    if (getState().responseCode === 4) {
        await trivia.get(`/api_token.php?command=reset&token=${getState().sessionToken}`);
        await dispatch(fetchQuestions());
    }
};

export const nextQuestion = () => (dispatch, getState) => {
    if (getState().counter > -1) {
        dispatch(toggleLock());
    }

    dispatch({ type: INCREASE_COUNTER });
    dispatch({ type: TOGGLE_ANIMATE });
};

export const resetCounter = () => {
    return { type: RESET_COUNTER };
}

export const increaseScore = () => {
    return { type: INCREASE_SCORE };
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

export const toggleLoading = () => {
    return { type: TOGGLE_LOADING };
};

export const toggleAnimate = () => {
    return { type: TOGGLE_ANIMATE };
};