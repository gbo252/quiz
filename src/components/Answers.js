import React from "react";
import { connect } from "react-redux"

import "../css/Answers.css";
import { selectAnswer } from "../actions";
import { decodeHtml } from "./helper";

class Answers extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.counter !== this.props.counter) {
            this.props.selectAnswer();
        }
    }

    renderClassName(a) {
        const { trivia, counter, answersLocked, selectedAnswer } = this.props;

        if (answersLocked) {
            if (trivia[counter].correct_answer === a) {
                return " bg-success text-white";
            } else {
                if (selectedAnswer.answer === a) {
                    return " bg-danger text-white";
                }
            }
        }
    }

    render() {
        const { answers, counter, selectAnswer, answersLocked, selectedAnswer } = this.props;

        return answers[counter].map((a, i) => {
            ++i;
            return (
                <React.Fragment key={i}>
                    <input
                        type="radio"
                        name="inlineRadioOptions"
                        id={`inlineRadio${i}`}
                        value={a}
                        onChange={e => selectAnswer(e.target.value, i)}
                        checked={selectedAnswer.answer === a}
                        disabled={answersLocked}
                    />
                    <label
                        className={"list-group-item list-group-item-action pr-5" + this.renderClassName(a)}
                        htmlFor={`inlineRadio${i}`}
                    >
                        {decodeHtml(a)}
                    </label>
                </React.Fragment>
            );
        });
    }
}

const mapStateToProps = state => {
    return {
        trivia: state.trivia,
        answers: state.answers,
        counter: state.counter,
        quizLength: state.quizLength,
        selectedAnswer: state.selectedAnswer,
        answersLocked: state.answersLocked
    };
};

export default connect(mapStateToProps, { selectAnswer })(Answers);