import React from "react";
import { connect } from "react-redux";

import {
    nextQuestion,
    toggleLock,
    increaseScore,
    toggleLoading
} from "../actions";
import { decodeHtml } from "./helper";
import Answers from "./Answers";
import Progress from "./Progress";

class Question extends React.Component {

    renderResult() {
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
                return <h2 className="text-success">Correct!</h2>;
            } else {
                return <h2 className="text-danger">Incorrect</h2>
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
        if (selectedAnswer.answer) {
            atts.disabled = false;
        }

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
                <button className="btn btn-lg btn-primary" type="button" disabled>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </button>
            );
        } else if (answersLocked) {
            return (
                <button className="btn btn-lg btn-primary" onClick={onClickNext}>
                    {counter < (quizLength - 1) ? "Next Question" : "Results"}
                </button>
            );
        } else {
            return (
                <button className="btn btn-lg btn-primary" onClick={toggleLock} {...atts}>
                    Submit
                </button>
            );
        }
    }

    render() {
        const { trivia, counter, quizLength } = this.props;
        const progress = (100 / quizLength) * (counter + 1);

        if (counter === -1) {
            return null;
        }

        if (trivia[0] && counter < quizLength) {
            return (
                <React.Fragment>
                    <Progress progress={progress} />
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="my-3">Question {counter + 1} of {quizLength}</h1>
                        <div>{decodeHtml(trivia[counter].question)}</div>
                        <div className="col-9 d-flex justify-content-around my-4">
                            <Answers />
                        </div>
                        <div className="mb-4">
                            {this.renderButton()}
                        </div>
                        {this.renderResult()}
                    </div>
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
        loading: state.loading
    };
};

export default connect(
    mapStateToProps,
    {
        nextQuestion,
        toggleLock,
        increaseScore,
        toggleLoading
    }
)(Question);