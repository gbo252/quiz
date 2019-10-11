import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';

import {
    nextQuestion,
    toggleLock,
    increaseScore,
    toggleLoading,
    toggleAnimate
} from "../actions";
import { decodeHtml } from "./helper";
import Answers from "./Answers";
import Progress from "./Progress";
import "../css/fade.css";

class Question extends React.Component {

    componentDidUpdate() {
        const {
            selectedAnswer,
            trivia,
            counter,
            answersLocked,
            increaseScore,
            loading
        } = this.props;
        if (answersLocked && !loading) {
            if (trivia[counter].correct_answer === selectedAnswer.answer) {
                increaseScore();
            }
        }
    }

    renderButton() {
        const {
            counter,
            quizLength,
            nextQuestion,
            answersLocked,
            toggleLock,
            selectedAnswer,
            loading,
            toggleLoading
        } = this.props;

        let atts = { disabled: true };
        if (selectedAnswer.answer) { atts.disabled = false; }

        const onClickNext = () => {
            if (counter === quizLength - 1) {
                toggleLoading();
                setTimeout(() => {
                    nextQuestion();
                    toggleLoading();
                }, 1500);
            } else {
                nextQuestion();
            }
        };

        if (loading) {
            return (
                <button className="btn btn-lg" type="button" disabled>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    />
                    LOADING...
                </button>
            );
        } else if (answersLocked) {
            return (
                <button
                    className="btn btn-lg"
                    onClick={onClickNext}
                >
                    {counter < (quizLength - 1) ? "NEXT QUESTION" : "GO TO RESULTS"}
                </button>
            );
        } else {
            return (
                <button className="btn btn-lg" onClick={toggleLock} {...atts}>
                    SUBMIT
                </button>
            );
        }
    }

    render() {
        const { trivia, counter, quizLength, animate, toggleAnimate } = this.props;
        const progress = (100 / (quizLength - 1)) * counter;

        if (trivia[0] && counter < quizLength && counter >= 0) {
            return (
                <React.Fragment>
                    <Progress progress={progress} counter={counter} quizLength={quizLength} />
                    <CSSTransition
                        in={animate}
                        timeout={1000}
                        classNames="fade"
                        onExit={() => toggleAnimate()}
                    >
                        <div className="d-flex flex-column align-items-center">
                            <p className="h4 my-3">QUESTION {counter + 1} of {quizLength}</p>
                            <div className="mx-3">{decodeHtml(trivia[counter].question)}</div>
                            <div className="list-group my-4">
                                <Answers />
                            </div>
                            <div className="mb-4">
                                {this.renderButton()}
                            </div>
                        </div>
                    </CSSTransition>
                </React.Fragment>
            );
        }

        return null;
    }

}

const mapStateToProps = state => {
    return {
        trivia: state.trivia,
        counter: state.counter,
        quizLength: state.quizLength,
        selectedAnswer: state.selectedAnswer,
        answersLocked: state.answersLocked,
        loading: state.loading,
        animate: state.animate
    };
};

export default connect(
    mapStateToProps,
    {
        nextQuestion,
        toggleLock,
        increaseScore,
        toggleLoading,
        toggleAnimate
    }
)(Question);