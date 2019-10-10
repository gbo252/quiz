import React from "react";
import { connect } from "react-redux";
import { confetti } from "../confetti/confetti";

import { resetQuiz, selectAnswer } from "../actions";

class Results extends React.Component {

    renderResultText() {
        const { quizLength, score } = this.props;

        const percent = (score / quizLength) * 100;

        if (percent === 100) {
            confetti.start(4000);
            return "TOP MARKS, YOU SMASHED IT!!!";
        } else if (percent >= 75) {
            return "NEARLY FULL MARKS, EXCELLENT JOB!";
        } else if (percent >= 50) {
            return "GOOD JOB!";
        } else if (percent >= 25) {
            return "NOT BAD, BUT YOU CAN DO BETTER!";
        } else if (percent > 0) {
            return "TRY AGAIN!";
        } else {
            return "BETTER LUCK NEXT TIME!";
        }
    }

    render() {
        const { counter, quizLength, score, resetQuiz, selectAnswer } = this.props;

        if (counter === quizLength) {
            selectAnswer();
            return (
                <React.Fragment>
                    <div className="d-flex flex-column align-items-center mt-3">
                        <p className="my-3 h2">YOUR RESULTS</p>
                        <p className="mb-3 h3">YOU SCORED {score} / {quizLength}</p>
                        <p className="mb-3">{this.renderResultText()}</p>
                        <button className="btn btn-lg mb-4" onClick={resetQuiz}>
                            NEW QUIZ
                        </button>
                    </div>
                </React.Fragment>
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        quizLength: state.quizLength,
        score: state.score
    };
};

export default connect(mapStateToProps, { resetQuiz, selectAnswer })(Results);