import React from "react";
import { connect } from "react-redux"
import { selectAnswer } from "../actions";
import { decodeHtml } from "./helper";

class Answers extends React.Component {

    radioRef1 = React.createRef();
    radioRef2 = React.createRef();
    radioRef3 = React.createRef();
    radioRef4 = React.createRef();

    radioRefs = {
        1: this.radioRef1,
        2: this.radioRef2,
        3: this.radioRef3,
        4: this.radioRef4
    };

    componentDidUpdate(prevProps) {
        const { counter, quizLength, selectedAnswer, answersLocked, selectAnswer } = this.props;

        if (prevProps.counter !== counter) {
            selectAnswer();
            if (counter < quizLength && selectedAnswer.i) {
                this.radioRefs[selectedAnswer.i].current.checked = false;
            }
        }

        if (answersLocked) {
            for (let x in this.radioRefs) {
                this.radioRefs[x].current.disabled = true;
            }
        }

        if (!answersLocked && counter > 0 && counter < quizLength) {
            for (let x in this.radioRefs) {
                this.radioRefs[x].current.disabled = false;
            }
        }
    }

    render() {
        const { trivia, answers, counter, selectAnswer, answersLocked } = this.props;

        return answers[counter].map((a, i) => {
            ++i;
            return (
                <div className="custom-control custom-radio custom-control-inline" key={i}>
                    <input
                        className="custom-control-input"
                        type="radio"
                        name="inlineRadioOptions"
                        ref={this.radioRefs[i]}
                        id={`inlineRadio${i}`}
                        value={a}
                        onChange={e => selectAnswer(e.target.value, i)}
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