import React from "react";
import { connect } from "react-redux";

import {
    nextQuestion,
    selectAnswer,
    toggleLock,
    increaseScore
} from "../actions";
import { decodeHtml } from "./helper";
import Answers from "./Answers";
import Progress from "./Progress";
import Button from "./Button";

class Question extends React.Component {

    componentDidUpdate(prevProps) {
        const { counter, quizLength, selected, answersLocked, selectAnswer } = this.props;

        if (prevProps.counter !== counter) {
            selectAnswer();
        }

        if (prevProps.counter !== counter && counter < quizLength) {
            if (selected.i) {
                this.radioRefs[selected.i].current.checked = false;
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

    renderResult() {
        const { selected, trivia, counter, answersLocked, increaseScore } = this.props;
        if (answersLocked) {
            if (trivia[counter].correct_answer === selected.answer) {
                increaseScore();
                return <h2 className="text-success">Correct!</h2>;
            } else {
                return <h2 className="text-danger">Incorrect</h2>
            }
        }
    }

    renderButton() {
        const { counter, quizLength, nextQuestion, answersLocked, toggleLock, selected } = this.props;
        let atts = { disabled: true };

        if (selected.answer) {
            atts.disabled = false;
        }

        let submit = <Button text="Submit" click={toggleLock} atts={atts} />;
        let next = <Button text={counter < (quizLength - 1) ? "Next Question" : "Results"} click={nextQuestion} />;

        return answersLocked ? next : submit;
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
                        <h1 className="my-3">Question {counter + 1}</h1>
                        <div>{decodeHtml(trivia[counter].question)}</div>
                        <div className="col-9 d-flex justify-content-around my-4">
                            <Answers radioRefs={this.radioRefs} />
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
        selected: state.selected,
        answersLocked: state.answersLocked
    };
};

export default connect(
    mapStateToProps,
    {
        nextQuestion,
        selectAnswer,
        toggleLock,
        increaseScore
    }
)(Question);