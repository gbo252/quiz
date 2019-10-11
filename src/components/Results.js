import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import { confetti } from "../confetti/confetti";

import "../css/fade.css";
import { resetQuiz, selectAnswer, toggleAnimate } from "../actions";

class Results extends React.Component {

    scoreRef = React.createRef();
    wordRef = React.createRef();

    componentDidUpdate(prevProps) {
        if (prevProps.counter !== this.props.counter) {
            if (this.props.counter === this.props.quizLength) {
                this.type2();
                this.props.toggleAnimate();
            }
        }
    }

    renderResultText() {
        const percent = (this.props.score / this.props.quizLength) * 100;

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
            return "TRY AGAIN...";
        } else {
            return "BETTER LUCK NEXT TIME!";
        }
    }

    type2() {
        let j = 0;
        let k = 0;
        let scoreText = `YOU SCORED ${this.props.score}/${this.props.quizLength}`;
        let wordText = this.renderResultText();
        let speed = 100;

        const typeWriter2 = (x, text, ref) => {
            if (x < text.length) {
                if (ref.current) {
                    ref.current.innerHTML += text.charAt(x);
                    x++;
                    setTimeout(() => typeWriter2(x, text, ref), speed);
                }
            }
        }

        if (this.scoreRef.current) {
            setTimeout(() => {
                typeWriter2(j, scoreText, this.scoreRef);
            }, 750);
            setTimeout(() => {
                j = 0;
                typeWriter2(k, wordText, this.wordRef);
            }, 3000);
        }
    }

    render() {
        const {
            counter,
            quizLength,
            resetQuiz,
            selectAnswer,
            animate,
            toggleAnimate
        } = this.props;

        if (counter === quizLength) {
            selectAnswer();
            return (
                <CSSTransition
                    in={animate}
                    timeout={1000}
                    classNames="fade"
                >
                    <div className="d-flex flex-column align-items-center text-center mt-3">
                        <p className="mt-3 h1">RESULTS</p>
                        <p className="mt-4 h3" ref={this.scoreRef}>&nbsp;</p>
                        <p className="mb-5 h6" ref={this.wordRef}>&nbsp;</p>
                        <button
                            className="btn btn-lg mb-4"
                            onClick={() => { toggleAnimate(); setTimeout(() => { resetQuiz(); }, 500); }}
                        >
                            NEW QUIZ
                        </button>
                    </div>
                </CSSTransition>
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        quizLength: state.quizLength,
        score: state.score,
        animate: state.animate
    };
};

export default connect(mapStateToProps, { resetQuiz, selectAnswer, toggleAnimate })(Results);