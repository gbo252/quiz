import { combineReducers } from "redux";
import { FETCH_QUESTIONS, COUNTER, SELECT_ANSWER } from "../actions/types";

const quizLength = () => {
    return 5;
};

const trivia = (state = [], action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return [...state, ...action.payload];
        default:
            return state;
    }
};

const counter = (state = -1, action) => {
    switch (action.type) {
        case COUNTER:
            return ++state;
        default:
            return state;
    }
};

const initalSelect = {
    answer: null,
    i: null
};

const selected = (state = initalSelect, action) => {
    switch (action.type) {
        case SELECT_ANSWER:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    trivia,
    counter,
    quizLength,
    selected
});