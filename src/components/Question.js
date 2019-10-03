import React from "react";
import { connect } from "react-redux";
import { nextQuestion } from "../actions";

class Question extends React.Component {
    render() {
        const { trivia, counter, nextQuestion, quizLength } = this.props;

        if (trivia[0] && counter < quizLength) {
            return (
                <div>
                    <h2>Question {counter + 1}</h2>
                    <div>{trivia[counter].question}</div>
                    <button onClick={nextQuestion}>
                        {counter < (quizLength - 1) ? "Question " + (counter + 2) : "Results"}
                    </button>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    return {
        trivia: state.trivia,
        counter: state.counter,
        quizLength: state.quizLength
    };
};

export default connect(mapStateToProps, { nextQuestion })(Question);