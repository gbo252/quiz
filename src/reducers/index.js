import { combineReducers } from "redux";
import {
    SESSION_TOKEN,
    RESPONSE_CODE,
    FETCH_QUESTIONS,
    FETCH_ANSWERS,
    INCREASE_COUNTER,
    RESET_COUNTER,
    INCREASE_SCORE,
    RESET_SCORE,
    SELECT_ANSWER,
    TOGGLE_LOCK
} from "../actions/types";

const quizLength = () => {
    return 3;
};

const sessionToken = (state = null, action) => {
    switch (action.type) {
        case SESSION_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

const responseCode = (state = null, action) => {
    switch (action.type) {
        case RESPONSE_CODE:
            return action.payload;
        default:
            return state;
    }
};

const trivia = (state = [], action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return action.payload;
        default:
            return state;
    }
};

const answers = (state = [], action) => {
    switch (action.type) {
        case FETCH_ANSWERS:
            return action.payload;
        default:
            return state;
    }
};

const counter = (state = -1, action) => {
    switch (action.type) {
        case INCREASE_COUNTER:
            return ++state;
        case RESET_COUNTER:
            return state = -1;
        default:
            return state;
    }
};

const score = (state = 0, action) => {
    switch (action.type) {
        case INCREASE_SCORE:
            return ++state;
        case RESET_SCORE:
            return state = 0;
        default:
            return state;
    }
};

const selected = (state = { answer: null, i: null }, action) => {
    switch (action.type) {
        case SELECT_ANSWER:
            return action.payload;
        default:
            return state;
    }
};

const answersLocked = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_LOCK:
            return !state;
        default:
            return state;
    }
};

export default combineReducers({
    sessionToken,
    responseCode,
    trivia,
    answers,
    counter,
    score,
    quizLength,
    selected,
    answersLocked
});