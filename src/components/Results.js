import React from "react";
import { connect } from "react-redux";

import { resetQuiz, selectAnswer } from "../actions";

class Results extends React.Component {
    render() {
        const { counter, quizLength, score, resetQuiz, selectAnswer } = this.props;

        if (counter === quizLength) {
            selectAnswer();
            return (
                <div className="d-flex flex-column align-items-center mt-3">
                    <h2 className="mb-3">Your Results</h2>
                    <h4 className="mb-3">You scored {score} / {quizLength}</h4>
                    <button className="btn btn-lg btn-primary" onClick={resetQuiz}>
                        New Quiz
                    </button>
                </div>
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