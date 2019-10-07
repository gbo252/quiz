import React from "react";
import { connect } from "react-redux"
import { selectAnswer } from "../actions";
import { decodeHtml } from "./helper";

class Answers extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.counter !== this.props.counter) {
            this.props.selectAnswer();
        }
    }

    render() {
        const { trivia, answers, counter, selectAnswer, answersLocked, selectedAnswer } = this.props;

        return answers[counter].map((a, i) => {
            ++i;
            return (
                <div className="custom-control custom-radio custom-control-inline" key={i}>
                    <input
                        className="custom-control-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id={`inlineRadio${i}`}
                        value={a}
                        onChange={e => selectAnswer(e.target.value, i)}
                        checked={selectedAnswer.answer === a}
                        disabled={answersLocked}
                    />
                    <label
                        className={"custom-control-label" + (answersLocked && trivia[counter].correct_answer === a ? " text-success font-weight-bold" : "")}
                        htmlFor={`inlineRadio${i}`}
                    >
                        {decodeHtml(a)}
                    </label>
                </div>
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