import React from "react";
import { connect } from "react-redux";

import "../css/Jumbotron.css";
import quiz from "../images/quiz.png"

class Jumbotron extends React.Component {
    render() {
        return (
            <div
                className={
                    "jumbotron jumbotron-fluid keyboard"
                    + (this.props.counter >= 0 ? " slim-keyboard" : "")
                }
            >
                <img
                    src={quiz}
                    className={
                        "quiz d-block mx-auto"
                        + (this.props.counter >= 0 ? " slim-quiz" : "")
                    }
                    alt="quiz"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { counter: state.counter };
};

export default connect(mapStateToProps)(Jumbotron);