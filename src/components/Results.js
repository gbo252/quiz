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
            return "Top marks, you smashed it!!!";
        } else if (percent >= 75) {
            return "Nearly full marks, excellent job!";
        } else if (percent >= 50) {
            return "Good job!";
        } else if (percent >= 25) {
            return "Better than nothing...";
        } else if (percent > 0) {
            return "Try again!";
        } else {
            return "Better luck next time!";
        }
    }

    render() {
        const { counter, quizLength, score, resetQuiz, selectAnswer } = this.props;

        if (counter === quizLength) {
            selectAnswer();
            return (
                <div className="d-flex flex-column align-items-center mt-3">
                    <h2 className="mb-3">Your Results</h2>
                    <p className="mb-3 display-4">You scored {score} / {quizLength}</p>
                    <p className="mb-3">{this.renderResultText()}</p>
                    <button className="btn btn-lg btn-danger" onClick={resetQuiz}>
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