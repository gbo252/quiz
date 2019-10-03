import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { nextQuestion, selectAnswer, toggleLock } from "../actions";
import { decodeHtml } from "./helper";
import Progress from "./Progress";
import Button from "./Button";

class Question extends React.Component {

    componentDidUpdate(prevProps) {
        const { counter, quizLength, selected, answersLocked } = this.props;

        if (prevProps.counter !== counter && counter < quizLength) {
            if (selected.i) {
                this.radioRefs[selected.i].current.checked = false;
            }
            // Array.from(this.radioRef.current.parentElement.parentElement.children)
            //     .forEach(answer => answer.children[0].checked = false);
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

    shufflerMemoized = _.memoize(counter => _.shuffle([...this.props.trivia[counter].incorrect_answers, this.props.trivia[counter].correct_answer]));

    renderAnswers() {
        return this.shufflerMemoized(this.props.counter)
            .map((q, i) => {
                ++i;
                return (
                    <div className="custom-control custom-radio custom-control-inline" key={i}>
                        <input
                            className="custom-control-input"
                            type="radio"
                            name="inlineRadioOptions"
                            ref={this.radioRefs[i]}
                            id={`inlineRadio${i}`}
                            value={q}
                            onChange={e => this.props.selectAnswer(e.target.value, i)}
                        />
                        <label className="custom-control-label" htmlFor={`inlineRadio${i}`}>
                            {decodeHtml(q)}
                        </label>
                    </div>
                );
            });
    }

    renderResult(trivia, counter) {
        const { selected } = this.props;
        if (trivia[counter].correct_answer === selected.answer) {
            return <div>Correct!!!</div>;
        }
    }

    renderButton(counter, quizLength, nextQuestion) {
        const { answersLocked, toggleLock } = this.props;

        if (!answersLocked) {
            return <Button text="Submit" click={toggleLock} />;
        } else {
            return <Button text={counter < (quizLength - 1) ? "Question " + (counter + 2) : "Results"} click={nextQuestion} />;
        }
    }

    render() {
        const { trivia, counter, nextQuestion, quizLength } = this.props;
        const progress = (100 / quizLength) * (counter + 1);

        if (counter === -1) {
            return null;
        }

        if (trivia[0] && counter < quizLength) {
            return (
                <React.Fragment>
                    <Progress progress={progress} />
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="my-3">Question {counter + 1}</h1>
                        <div>{decodeHtml(trivia[counter].question)}</div>
                        <div className="col-9 d-flex justify-content-around my-4">
                            {this.renderAnswers()}
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            {this.renderButton(counter, quizLength, nextQuestion)}
                        </div>
                    </div>
                    {this.renderResult(trivia, counter)}
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
        selected: state.selected,
        answersLocked: state.answersLocked
    };
};

export default connect(mapStateToProps, { nextQuestion, selectAnswer, toggleLock })(Question);