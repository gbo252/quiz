import React from "react";
import { connect } from "react-redux";

import "../css/Jumbotron.css";
import quiz from "../images/quiz.png"

class Jumbotron extends React.Component {

    render() {
        const { counter, quizLength } = this.props;

        return (
            <div
                className={
                    "jumbotron jumbotron-fluid keyboard mb-3"
                    + (counter >= 0 && counter < quizLength ? " slim-keyboard" : "")
                }
            >
                <img
                    src={quiz}
                    className={
                        "quiz img-fluid d-block mx-auto"
                        + (counter >= 0 && counter < quizLength ? " slim-quiz" : "")
                    }
                    alt="quiz"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        counter: state.counter,
        quizLength: state.quizLength
    };
};

export default connect(mapStateToProps)(Jumbotron);