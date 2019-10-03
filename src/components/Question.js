import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { nextQuestion, selectAnswer } from "../actions";
import { decodeHtml } from "./helper";
import Progress from "./Progress";

class Question extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.counter !== this.props.counter && this.props.counter < this.props.quizLength) {
            if (this.props.selected.i) {
                this.radioRefs[this.props.selected.i].current.checked = false;
            }
            // Array.from(this.radioRef.current.parentElement.parentElement.children)
            //     .forEach(answer => answer.children[0].checked = false);
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

    renderResult() {
        const { trivia, counter, selected } = this.props;
        if (trivia[counter].correct_answer === selected.answer) {
            return <div>Correct!!!</div>;
        }
    }

    render() {
        const { trivia, counter, nextQuestion, quizLength } = this.props;
        const progress = (100 / quizLength) * (counter + 1);

        if (counter === -1) {
            return null;
        }

        if (!trivia[0]) {
            return <div className="h3">Loading...</div>;
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
                            <button className="btn btn-lg btn-primary" onClick={nextQuestion}>
                                {counter < (quizLength - 1) ? "Question " + (counter + 2) : "Results"}
                            </button>
                        </div>
                    </div>
                    {this.renderResult()}
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
        selected: state.selected
    };
};

export default connect(mapStateToProps, { nextQuestion, selectAnswer })(Question);