import { combineReducers } from "redux";
import { FETCH_QUESTIONS, COUNTER } from "../actions/types";

const quizLength = () => {
    return 3;
};

const trivia = (state = [], action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return [...state, ...action.payload];
        default:
            return state;
    }
};

const counter = (state = 0, action) => {
    switch (action.type) {
        case COUNTER:
            return ++state;
        default:
            return state;
    }
};

export default combineReducers({
    trivia,
    counter,
    quizLength
});